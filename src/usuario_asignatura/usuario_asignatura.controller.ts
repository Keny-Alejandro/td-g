/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioAsignaturaService } from './usuario_asignatura.service';

@Controller('usuario-asignatura')
export class UsuarioAsignaturaController {
  constructor(
    private readonly usuarioAsignaturaService: UsuarioAsignaturaService,
  ) {}

  @Get('GroupsDocente/:Usuario_ID')
  async getGroupsDocente(@Param('Usuario_ID') usuarioId: number) {
    try {
      const groupsDocente = await this.usuarioAsignaturaService.getGroupsDocente(usuarioId);
      return groupsDocente;
    } catch (error) {
      throw new NotFoundException('No se encontraron grupos para el usuario proporcionado');
    }
  }
}
