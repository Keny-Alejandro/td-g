import { Module } from '@nestjs/common';
import { UsuarioCalificacionService } from './usuario_calificacion.service';
import { UsuarioCalificacionController } from './usuario_calificacion.controller';

@Module({
  controllers: [UsuarioCalificacionController],
  providers: [UsuarioCalificacionService],
})
export class UsuarioCalificacionModule {}
