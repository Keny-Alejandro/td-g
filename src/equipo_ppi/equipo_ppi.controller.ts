/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';

@Controller('equipo-ppi')
export class EquipoPpiController {
  constructor(private readonly equipoPpiService: EquipoPpiService) {}

  @Get('GetBitacoraByCode/:id')
  async obtenerBitacoraGrupo(@Param('id') id: number) {
    try {
      const bitacoraGrupo = await this.equipoPpiService.obtenerBitacoraGrupo(id);
      return bitacoraGrupo;
    } catch (error) {
      return { error: 'Error al obtener la bitácora del grupo' };
    }
  }

}
