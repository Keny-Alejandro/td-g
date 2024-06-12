/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioAsignatura } from 'src/usuario_asignatura/entities/usuario_asignatura.entity';
import { EntregaEquipoPpi } from 'src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity';
import { EquipoPpiPjic } from '../equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';
import { Notificacione } from 'src/notificaciones/entities/notificacione.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { Semana } from 'src/semanas/entities/semana.entity';
import { UsuarioCalificacion } from '../usuario_calificacion/entities/usuario_calificacion.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([
    Usuario, 
    UsuarioAsignatura, 
    CitasAsesoriaPpi, 
    EquipoPpiPjic, 
    EntregaEquipoPpi, 
    EquipoUsuario, 
    EstadoSeguimientoCambio, 
    Notificacione,
    SeguimientoPpi,
    EquipoPpi,
    Semana,
    UsuarioCalificacion,
    HoraSemanal])],
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule { }
