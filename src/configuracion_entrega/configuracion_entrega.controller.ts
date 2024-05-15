/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';
import { ConfiguracionEntrega } from './entities/configuracion_entrega.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('configuracion-entrega')
export class ConfiguracionEntregaController {
  constructor(
    private readonly configuracionEntregaService: ConfiguracionEntregaService,
    @InjectRepository(ConfiguracionEntrega)
    private configuracionEntregaRepository: Repository<ConfiguracionEntrega>,
  ) { }

  @Post('SetEntregaSettings')
  async createConfiguracionEntrega(@Body() entregas: any[]): Promise<void> {
    await this.configuracionEntregaService.createConfiguracionEntrega(entregas);
  }

  @Get('AllEntregaSettings')
  async getConfiguracionesEntrega(): Promise<any[]> {
    try {
      const configuraciones = await this.configuracionEntregaRepository
        .createQueryBuilder('ce')
        .select([
          'ce."Configuracion_Entrega_ID"',
          'ce."Tipo_Entrega_ID" as id',
          'te."Tipo_Entrega_Descripcion" as nombre',
          'ce."Rol_ID" as rol',
          'ce."Porcentaje_Entrega" as porcentaje',
          'ce."Plazo_Entrega" as fechaEntrega',
          'ce."Plazo_Calificacion" as fechaCalificacion',
        ])
        .innerJoin('Tipo_Entrega', 'te', 'te."Tipo_Entrega_ID" = ce."Tipo_Entrega_ID"')
        .orderBy('ce."Tipo_Entrega_ID"', 'ASC')
        .getRawMany();

      return configuraciones;
    } catch (error) {
      throw error;
    }
  }

  @Get('GetPPIEntregaSOL')
  async getEntregasSOL(){
    return this.configuracionEntregaService.getEntregasSOL();
  }

  @Get('GetPPIEntregaCoordinador')
  async getEntregasCoordinador(){
    return this.configuracionEntregaService.getEntregasSOL();
  }

}