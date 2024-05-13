/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';

@Controller('entrega-equipo-ppi')
export class EntregaEquipoPpiController {
  constructor(private readonly entregaService: EntregaEquipoPpiService) { }

  @Post('UploadPPIEntregaFile')
  async uploadFile(
    @Body() data: { ubicacion: string; bitacoraPpiId: number; configuracionEntregaId: number },
  ) {
    // Guardar la información en la base de datos
    await this.entregaService.createEntrega(data);
  }
}
