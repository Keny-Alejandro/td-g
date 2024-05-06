/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';

@Controller('equipo-ppi-pjic')
export class EquipoPpiPjicController {
  constructor(private readonly equipoPpiPjicService: EquipoPpiPjicService) {}

  @Get('GetAllAsesores')
  async getEquipoPpiPjicData() {
    const data = await this.equipoPpiPjicService.getEquipoPpiPjicData();
    return data.map(item => ({
      Codigo_Equipo: item.codigoEquipo,
      Usuario_ID: item.usuariopjic ? item.usuariopjic.id : null, // Cambiamos 'Usuario_ID' por 'id'
    }));
  }
}
