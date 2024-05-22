/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioCalificacionService } from './usuario_calificacion.service';
import { UsuarioCalificacionController } from './usuario_calificacion.controller';
import { UsuarioCalificacion } from './entities/usuario_calificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioCalificacion])],
  controllers: [UsuarioCalificacionController],
  providers: [UsuarioCalificacionService],
})
export class UsuarioCalificacionModule {}
