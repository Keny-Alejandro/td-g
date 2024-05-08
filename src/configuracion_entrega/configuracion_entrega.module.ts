/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';
import { ConfiguracionEntregaController } from './configuracion_entrega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionEntrega } from './entities/configuracion_entrega.entity';
import { TipoEntrega } from 'src/tipo_entrega/entities/tipo_entrega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfiguracionEntrega, TipoEntrega]),
  ],
  controllers: [ConfiguracionEntregaController],
  providers: [ConfiguracionEntregaService],
})
export class ConfiguracionEntregaModule {}
