/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { GoogleModule } from './api/api.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SemanasModule } from './semanas/semanas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { UsuarioCalificacionModule } from './usuario_calificacion/usuario_calificacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: { rejectUnauthorized: false }
    }),
    ServeStaticModule.forRoot(
      {
      rootPath: join(__dirname, '..', 'public'), // Path to the public directory
      serveRoot: '/public', // Base path to serve the files
      },{
        
      rootPath: join(__dirname, '..', 'sources/media/banner'), // Path to the public directory
      serveRoot: '/sources/media/banner', // Base path to serve the files (img)
      }
    ),
    GoogleModule,
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
    SemanasModule,
    NotificacionesModule,
    UsuarioCalificacionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
