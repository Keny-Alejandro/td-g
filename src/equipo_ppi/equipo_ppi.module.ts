/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';
import { EquipoPpiController } from './equipo_ppi.controller';
import { BitacoraPpi } from './entities/equipo_ppi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BitacoraPpi])],
  controllers: [EquipoPpiController],
  providers: [EquipoPpiService],
})
export class EquipoPpiModule {}
