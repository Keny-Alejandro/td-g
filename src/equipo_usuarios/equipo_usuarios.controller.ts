/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EquipoUsuariosService } from './equipo_usuarios.service';
import { EquipoUsuario } from './entities/equipo_usuario.entity';

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

  @Get('GetGroupsByFirstDigit/:firstDigit')
  async getGruposPorPrimerDigito(@Param('firstDigit') firstDigit: string) {
    try {
      const grupos = await this.equipoUsuariosService.obtenerGruposPorPrimerDigito(firstDigit);
      return grupos;
    } catch (error) {
      return { error: 'Error al obtener los grupos' };
    }
  }

  @Get('GetAllGroups')
  findAll(): Promise<EquipoUsuario[]> {
    return this.equipoUsuariosService.findAll();
  }
}
