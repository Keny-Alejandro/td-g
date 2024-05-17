import { Module } from '@nestjs/common';
import { HoraSemanalService } from './hora_semanal.service';
import { HoraSemanalController } from './hora_semanal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoraSemanal } from './entities/hora_semanal.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { Semana } from 'src/semanas/entities/semana.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HoraSemanal]), 
    TypeOrmModule.forFeature([Usuario]), 
    TypeOrmModule.forFeature([CitasAsesoriaPpi]), 
    TypeOrmModule.forFeature([EquipoPpi]), 
    TypeOrmModule.forFeature([EquipoUsuario]), 
    TypeOrmModule.forFeature([Semana]), 
  ],
  controllers: [HoraSemanalController],
  providers: [HoraSemanalService],
})
export class HoraSemanalModule {}
