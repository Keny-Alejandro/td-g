/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { UsuarioAsignatura } from 'src/usuario_asignatura/entities/usuario_asignatura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Programa, Rol, Asignatura, UsuarioAsignatura]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
