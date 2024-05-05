/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { EquipoUsuariosService } from './equipo_usuarios.service';

@Controller('equipo-usuarios')
export class EquipoUsuariosController {
  constructor(private readonly equipoUsuariosService: EquipoUsuariosService) { }

  @Post('CreateGroups')
  async crearEquipos(@Body() grupos: any[]) {
    try {
      await this.equipoUsuariosService.procesarGrupos(grupos);
      return { message: 'Grupos procesados exitosamente' };
    } catch (error) {
      return { error: 'Error al procesar los grupos' };
    }
  }
}
