/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioAsignatura } from 'src/usuario_asignatura/entities/usuario_asignatura.entity';
import { AsesoriasPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { BitacoraPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EntregaEquipoPpi } from 'src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity';
import { EquipoPpiPjic } from '../equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BitacoraPpi, Usuario, AsesoriasPpi, UsuarioAsignatura, CitasAsesoriaPpi, EquipoPpiPjic, EntregaEquipoPpi, EquipoUsuario, EstadoSeguimientoCambio, HoraSemanal])],
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule { }
