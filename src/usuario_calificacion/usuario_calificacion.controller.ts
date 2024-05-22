/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UsuarioCalificacionService } from './usuario_calificacion.service';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioCalificacion } from './entities/usuario_calificacion.entity';

@ApiTags('usuario-calificacion')
@Controller('usuario-calificacion')
export class UsuarioCalificacionController {
  constructor(
    private readonly usuarioCalificacionService: UsuarioCalificacionService,
  ) { }

  @Get(':user')
  async getCalificacionesByUser(@Param('user') user: number): Promise<UsuarioCalificacion[]> {
    return await this.usuarioCalificacionService.findByUser(user);
  }
}
