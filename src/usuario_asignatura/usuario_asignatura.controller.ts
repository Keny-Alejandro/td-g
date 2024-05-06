/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioAsignaturaService } from './usuario_asignatura.service';

@Controller('usuario-asignatura')
export class UsuarioAsignaturaController {
  constructor(
    private readonly usuarioAsignaturaService: UsuarioAsignaturaService,
  ) {}

  
}
