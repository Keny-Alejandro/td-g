/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';
import { EquipoPpiPjicController } from './equipo_ppi_pjic.controller';
import { EquipoPpiPjic } from './entities/equipo_ppi_pjic.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipoPpiPjic, Usuario]),
  ],
  controllers: [EquipoPpiPjicController],
  providers: [EquipoPpiPjicService],
})
export class EquipoPpiPjicModule {}
