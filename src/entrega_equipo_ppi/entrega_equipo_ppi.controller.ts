/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';
import { Multer } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Controller('entrega-equipo-ppi')
export class EntregaEquipoPpiController {
  constructor(
    private readonly entregaEquipoPpiService: EntregaEquipoPpiService,
  ) { }

  @Post('UploadPPIEntregaFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(

    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { entregaId, configuracionEntregaId, bitacoraPpiId } = body;
    const folderPath = path.join(__dirname, '..', 'files');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    // Guardar el archivo en la carpeta src/files
    const ubicacion = `/app/files/${file.originalname}`;
    await fs.promises.writeFile(ubicacion, file.buffer);

    // Guardar la información en la base de datos
    await this.entregaEquipoPpiService.createEntrega({
      ubicacion,
      bitacoraPpiId,
      configuracionEntregaId,
    });
  }
}