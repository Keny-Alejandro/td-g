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
import { EntregaEquipoPpi } from 'src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity';
import { EquipoPpiPjic } from '../equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacione } from 'src/notificaciones/entities/notificacione.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { Semana } from 'src/semanas/entities/semana.entity';
import { UsuarioCalificacion } from '../usuario_calificacion/entities/usuario_calificacion.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('backup')
@Controller('backup')
export class BackupController {

  private s3: AWS.S3;
  @InjectRepository(UsuarioCalificacion)
  private readonly repositoryUsuarioCalificacion: Repository<UsuarioCalificacion>
  @InjectRepository(Notificacione)
  private readonly repositoryNotificacion: Repository<Notificacione>
  @InjectRepository(EstadoSeguimientoCambio)
  private readonly repositoryEstadoSeguimientoCambio: Repository<EstadoSeguimientoCambio>
  @InjectRepository(SeguimientoPpi)
  private readonly repositorySeguimientoPpi: Repository<SeguimientoPpi>
  @InjectRepository(CitasAsesoriaPpi)
  private readonly repositoryCitasAsesoriaPpi: Repository<CitasAsesoriaPpi>
  @InjectRepository(EquipoPpi)
  private readonly repositoryEquipoPpi: Repository<EquipoPpi>
  @InjectRepository(Semana)
  private readonly repositorySemana: Repository<Semana>
  @InjectRepository(Usuario)
  private readonly UsuarioRepository: Repository<Usuario>
  @InjectRepository(UsuarioAsignatura)
  private readonly UsuarioAsignaturaRepository: Repository<UsuarioAsignatura>
  @InjectRepository(EntregaEquipoPpi)
  private readonly EntregaEquipoPpiRepository: Repository<EntregaEquipoPpi>
  @InjectRepository(EquipoPpiPjic)
  private readonly EquipoPpiPjicRepository: Repository<EquipoPpiPjic>
  @InjectRepository(EquipoUsuario)
  private readonly EquipoUsuarioRepository: Repository<EquipoUsuario>
  @InjectRepository(HoraSemanal)
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
          console.log(`Deleting ${objectsToDelete.length} objects from ${folderToClean}`);
          const deleteParams = {
            Bucket: bucketName,
            Delete: { Objects: objectsToDelete },
          };
          const deleteResponse = await this.s3.deleteObjects(deleteParams).promise();
          console.log('Delete response:', deleteResponse);
        } else {
          console.log(`No objects to delete in ${folderToClean}`);
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
    
      archive.finalize();
    
      await Promise.all([
        this.removeSystem(),
        this.deleteFromUsuarioTable(),
      ]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      res.end(); // Asegurar que se cierre adecuadamente el stream de respuesta
    }
    
  }

  async removeSystem() {
    const seguim = this.repositorySeguimientoPpi.clear();//OK
    const citas = this.repositoryCitasAsesoriaPpi.clear();//OK
    const userasign = this.UsuarioAsignaturaRepository.clear(); // OK
    const horasem = this.HoraSemanalRepository.clear(); // OK
    const equipoppipjic = this.EquipoPpiPjicRepository.clear(); // OK
    const equipus = this.EquipoUsuarioRepository.clear(); // OK
    const estadoSeg = this.repositoryEstadoSeguimientoCambio.clear(); // OK
    const equipo = this.repositoryEquipoPpi.clear();//OK
    const entregaequ = this.EntregaEquipoPpiRepository.clear(); // OK
    const notif = this.repositoryNotificacion.clear(); // OK
    const semana = this.repositorySemana.clear(); // OK
    const usercalif = this.repositoryUsuarioCalificacion.clear();
    if (seguim && citas && userasign && horasem && equipoppipjic && equipus && equipo && entregaequ && notif && estadoSeg && semana && usercalif)
      return true
    else
      return false
  }

  async deleteFromUsuarioTable(): Promise<void> {
    try {
      await this.UsuarioRepository
        .createQueryBuilder()
        .delete()
        .from(Usuario)
        .where("Rol_ID != :roleId", { roleId: 4 })
        .execute();
    } catch (error) {
      console.error(`Error al eliminar registros de la tabla ${this.UsuarioRepository.metadata.tableName}:`, error);
      throw error;
    }
  }
}
