import { Module } from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';
import { EquipoPpiController } from './equipo_ppi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoPpi } from './entities/equipo_ppi.entity'; 
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipoPpi]), 
    TypeOrmModule.forFeature([EquipoPpiPjic]), 
    TypeOrmModule.forFeature([Asignatura]), 
    TypeOrmModule.forFeature([EquipoUsuario]), 
    TypeOrmModule.forFeature([SeguimientoPpi]), 
    TypeOrmModule.forFeature([CitasAsesoriaPpi])  , 
    TypeOrmModule.forFeature([Usuario]) 
  ],
  controllers: [EquipoPpiController],
  providers: [EquipoPpiService],
})
export class EquipoPpiModule {}
