/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioAsignaturaService } from './usuario_asignatura.service';
import { UsuarioAsignaturaController } from './usuario_asignatura.controller';
import { UsuarioAsignatura } from './entities/usuario_asignatura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioAsignatura]),
  ],
  controllers: [UsuarioAsignaturaController],
  providers: [UsuarioAsignaturaService],
})
export class UsuarioAsignaturaModule {}
