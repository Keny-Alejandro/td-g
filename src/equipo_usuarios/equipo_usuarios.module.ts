import { Module } from '@nestjs/common';
import { EquipoUsuariosService } from './equipo_usuarios.service';
import { EquipoUsuariosController } from './equipo_usuarios.controller';

@Module({
  controllers: [EquipoUsuariosController],
  providers: [EquipoUsuariosService],
})
export class EquipoUsuariosModule {}
