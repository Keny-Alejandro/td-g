/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';

@Controller('configuracion-entrega')
export class ConfiguracionEntregaController {
  constructor(
    private readonly configuracionEntregaService: ConfiguracionEntregaService,
  ) { }

  @Post('SetEntregaSettings')
  async createConfiguracionEntrega(@Body() entregas: any[]): Promise<void> {
    await this.configuracionEntregaService.createConfiguracionEntrega(entregas);
  }

}