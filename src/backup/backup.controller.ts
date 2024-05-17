/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Res
} from '@nestjs/common';
import * as archiver from 'archiver';
import * as AWS from 'aws-sdk';
import { Response } from 'express';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioAsignatura } from 'src/usuario_asignatura/entities/usuario_asignatura.entity';
import { AsesoriasPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { BitacoraPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EntregaEquipoPpi } from 'src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity';
import { EquipoPpiPjic } from '../equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';

@Controller('backup')
export class BackupController {

  private s3: AWS.S3;
  private readonly UsuarioRepository: Repository<Usuario>
  private readonly UsuarioAsignaturaRepository: Repository<UsuarioAsignatura>
  private readonly AsesoriasPpiRepository: Repository<AsesoriasPpi>
  private readonly BitacoraPpiRepository: Repository<BitacoraPpi>
  private readonly CitasAsesoriaPpiRepository: Repository<CitasAsesoriaPpi>
  private readonly EntregaEquipoPpiRepository: Repository<EntregaEquipoPpi>
  private readonly EquipoPpiPjicRepository: Repository<EquipoPpiPjic>
  private readonly EquipoUsuarioRepository: Repository<EquipoUsuario>
  private readonly EstadoSeguimientoCambioRepository: Repository<EstadoSeguimientoCambio>
  private readonly HoraSemanalRepository: Repository<HoraSemanal>

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  @Get('/download-and-clean-bucket')
  async downloadAndCleanBucket(@Res() res: Response) {
    try {
      const bucketName = 'tdggestiondocumental';
      const foldersToClean = [
        'PPI/Tecnica/S1/',
        'PPI/Tecnica/S2/',
        'PPI/Tecnica/S3/',
        'PPI/Tecnica/S4/',
        'PPI/Tecnologia/S5/',
        'PPI/Tecnologia/S6/',
      ];

      const archive = archiver('zip');
      archive.pipe(res);

      for (const folderToClean of foldersToClean) {
        let continuationToken;
        let data;
        do {
          const params = {
            Bucket: bucketName,
            ContinuationToken: continuationToken,
            Prefix: folderToClean, // Filter objects by prefix
          };

          data = await this.s3.listObjectsV2(params).promise();

          for (const file of data.Contents) {
            const params = { Bucket: bucketName, Key: file.Key };
            const fileData = await this.s3.getObject(params).promise();
            archive.append(fileData.Body as Readable, { name: file.Key });
          }

          continuationToken = data.NextContinuationToken;
        } while (continuationToken);

        // Limpiar la carpeta especificada en el bucket
        const objectsToDelete = data.Contents.map((obj) => ({ Key: obj.Key }));
        if (objectsToDelete.length > 0) {
          await this.s3
            .deleteObjects({
              Bucket: bucketName,
              Delete: { Objects: objectsToDelete },
            })
            .promise();
        }

        // Volver a crear la carpeta en el bucket
        await this.s3
          .upload({
            Bucket: bucketName,
            Key: folderToClean, // Nombre del folder
            Body: '', // Subir un objeto vacío
          })
          .promise();
      }

      await Promise.all([
        this.deleteFromTable(this.EstadoSeguimientoCambioRepository),
        this.deleteFromTable(this.AsesoriasPpiRepository),
        this.deleteFromTable(this.UsuarioAsignaturaRepository),
        this.deleteFromTable(this.HoraSemanalRepository),
        this.deleteFromTable(this.EquipoPpiPjicRepository),
        this.deleteFromTable(this.EquipoUsuarioRepository),
        this.deleteFromTable(this.BitacoraPpiRepository),
        this.deleteFromTable(this.EntregaEquipoPpiRepository),
        this.deleteFromTable(this.CitasAsesoriaPpiRepository),
        this.deleteFromTable(this.UsuarioRepository),
      ]);

      archive.finalize();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      res.end(); // Asegurar que se cierre adecuadamente el stream de respuesta
    }
  }

  async deleteFromTable(repository: Repository<any>): Promise<void> {
    try {
      await repository.clear(); // Esto eliminará todos los registros de la tabla
    } catch (error) {
      console.error(`Error al eliminar registros de la tabla ${repository.metadata.tableName}:`, error);
      throw error;
    }
  }
}
