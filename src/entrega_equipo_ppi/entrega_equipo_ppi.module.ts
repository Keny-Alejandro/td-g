/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';
import { EntregaEquipoPpiController } from './entrega_equipo_ppi.controller';
import { EntregaEquipoPpi } from './entities/entrega_equipo_ppi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntregaEquipoPpi]),
  ],
  controllers: [EntregaEquipoPpiController],
  providers: [EntregaEquipoPpiService],
})
export class EntregaEquipoPpiModule {}
