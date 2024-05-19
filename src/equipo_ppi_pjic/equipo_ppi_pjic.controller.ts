/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('equipo-ppi-pjic')
@Controller('equipo-ppi-pjic')
export class EquipoPpiPjicController {
  constructor(private readonly equipoPpiPjicService: EquipoPpiPjicService) { }

  @Get('GetAllAsesores')
  async getEquipoPpiPjicData() {
    const data = await this.equipoPpiPjicService.getEquipoPpiPjicData();
    return data.map(item => ({
      Codigo_Equipo: item.codigoEquipo,
      Usuario_ID: item.usuariopjic ? item.usuariopjic.id : null,
    }));
  }

  @Post('SaveAllAsesores')
  async guardarAsesores(@Body() data: { codigoEquipo: number; usuario_id: number }[]) {
    await this.equipoPpiPjicService.guardarAsesores(data);
    try {
      await this.equipoPpiPjicService.guardarAsesores(data);
      return { message: 'Asesores guardados correctamente' };
    } catch (error) {
      return { message: 'Error al guardar los asesores' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoPpiPjicService.findOne(+id);
  }
}
