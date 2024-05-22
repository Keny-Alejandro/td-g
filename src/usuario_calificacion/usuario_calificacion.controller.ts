/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioCalificacion } from './entities/usuario_calificacion.entity';
import { UsuarioCalificacionService } from './usuario_calificacion.service';

@ApiTags('usuario-calificacion')
@Controller('usuario-calificacion')
export class UsuarioCalificacionController {
  constructor(
    private readonly usuarioCalificacionService: UsuarioCalificacionService,
  ) {}

  @Get(':user')
  async getCalificacionesByUser(
    @Param('user') user: number,
  ): Promise<UsuarioCalificacion[]> {
    return await this.usuarioCalificacionService.findByUser(user);
  }

  @Post('actualizar-calificaciones')
  async actualizarCalificaciones(
    @Body() calificaciones: UsuarioCalificacion[],
  ): Promise<string> {
    try {
      await this.usuarioCalificacionService.actualizarCalificaciones(
        calificaciones,
      );
      return 'Éxito en la calificación.';
    } catch (error) {
      console.error('Error al actualizar calificaciones:', error);
      throw new Error('Ocurrió un error al actualizar las calificaciones');
    }
  }
}
