/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoUsuario } from './entities/equipo_usuario.entity';
import { EquipoUsuariosService } from './equipo_usuarios.service';
import { EquipoUsuariosController } from './equipo_usuarios.controller';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoUsuario, EquipoPpi, EquipoPpiPjic])],
  controllers: [EquipoUsuariosController],
  providers: [EquipoUsuariosService],
})
export class EquipoUsuariosModule {}
