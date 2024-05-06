/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';
import { EquipoPpiPjicController } from './equipo_ppi_pjic.controller';
import { EquipoPpiPjic } from './entities/equipo_ppi_pjic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipoPpiPjic]), // Importa tu entidad aquí
  ],
  controllers: [EquipoPpiPjicController],
  providers: [EquipoPpiPjicService],
})
export class EquipoPpiPjicModule {}
