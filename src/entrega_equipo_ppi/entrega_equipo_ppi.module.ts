/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';
import { EntregaEquipoPpiController } from './entrega_equipo_ppi.controller';
import { EntregaEquipoPpi } from './entities/entrega_equipo_ppi.entity';
import { BitacoraPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { ConfiguracionEntrega } from '../configuracion_entrega/entities/configuracion_entrega.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntregaEquipoPpi, BitacoraPpi, ConfiguracionEntrega]),
  ],
  controllers: [EntregaEquipoPpiController],
  providers: [EntregaEquipoPpiService],
})
export class EntregaEquipoPpiModule {}
