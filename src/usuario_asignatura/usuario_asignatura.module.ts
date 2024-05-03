import { Module } from '@nestjs/common';
import { UsuarioAsignaturaService } from './usuario_asignatura.service';
import { UsuarioAsignaturaController } from './usuario_asignatura.controller';

@Module({
  controllers: [UsuarioAsignaturaController],
  providers: [UsuarioAsignaturaService],
})
export class UsuarioAsignaturaModule {}
