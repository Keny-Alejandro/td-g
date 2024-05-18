/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
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

  @Get('GetPPIEntregaByID/:codigoEquipo')
  async getEntregas(@Param('codigoEquipo') codigoEquipo: number) {
    return this.entregaService.getEntregasByCodigoEquipo(codigoEquipo);
  }

  @Get('GetPPIEntregaByID')
  async getAllEntregas() {
    return this.entregaService.getAllEntregas();
  }

  @Post('updateScores')
  async postNotas(@Body() data: { Entrega_Equipo_PPI_ID: number, Calificacion: number }[]) {
    return this.entregaService.postNotas(data);
  }

  @Delete('deleteEntrega/:entregaEquipoPpiId')
  async deleteEntrega(@Param('entregaEquipoPpiId') id: number) {
    return this.entregaService.deleteEntrega(id);
  }

}
