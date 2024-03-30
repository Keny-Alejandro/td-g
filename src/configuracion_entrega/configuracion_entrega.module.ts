import { Module } from '@nestjs/common';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';
import { ConfiguracionEntregaController } from './configuracion_entrega.controller';

@Module({
  controllers: [ConfiguracionEntregaController],
  providers: [ConfiguracionEntregaService],
})
export class ConfiguracionEntregaModule {}
