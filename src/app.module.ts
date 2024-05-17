/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from './banner/banner.module';
import { EstadoSeguimientoModule } from './estado_seguimiento/estado_seguimiento.module';
import { EstadoSeguimientoCambioModule } from './estado_seguimiento_cambio/estado_seguimiento_cambio.module';
import { SeguimientoPpiModule } from './seguimiento_ppi/seguimiento_ppi.module';
import { ObservacionCitaModule } from './observacion_cita/observacion_cita.module';
import { TipoCitaModule } from './tipo_cita/tipo_cita.module';
import { EstadoCitaModule } from './estado_cita/estado_cita.module';
import { CitasAsesoriaPpiModule } from './citas_asesoria_ppi/citas_asesoria_ppi.module';
import { TipoEntregaModule } from './tipo_entrega/tipo_entrega.module';
import { ConfiguracionEntregaModule } from './configuracion_entrega/configuracion_entrega.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { EntregaEquipoPpiModule } from './entrega_equipo_ppi/entrega_equipo_ppi.module';
import { EquipoUsuariosModule } from './equipo_usuarios/equipo_usuarios.module';
import { ProgramaModule } from './programa/programa.module';
import { RolModule } from './rol/rol.module';
import { HoraSemanalModule } from './hora_semanal/hora_semanal.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EquipoPpiModule } from './equipo_ppi/equipo_ppi.module';
import { EquipoPpiPjicModule } from './equipo_ppi_pjic/equipo_ppi_pjic.module';
import { TimezoneModule } from './timezone.module';
import { UsuarioAsignaturaModule } from './usuario_asignatura/usuario_asignatura.module';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-proud-recipe-a42qmy7v-pooler.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'default',
      password: '4LMDXreCpE8l',
      database: 'verceldb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: { rejectUnauthorized: false }
    }),
    TimezoneModule,
    BannerModule,
    EstadoSeguimientoModule,
    EstadoSeguimientoCambioModule,
    SeguimientoPpiModule,
    ObservacionCitaModule,
    TipoCitaModule,
    EstadoCitaModule,
    CitasAsesoriaPpiModule,
    TipoEntregaModule,
    ConfiguracionEntregaModule,
    AsignaturaModule,
    EntregaEquipoPpiModule,
    EquipoUsuariosModule,
    ProgramaModule,
    RolModule,
    HoraSemanalModule,
    UsuarioModule,
    EquipoPpiModule,
    EquipoPpiPjicModule,
    UsuarioAsignaturaModule,
    BackupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
