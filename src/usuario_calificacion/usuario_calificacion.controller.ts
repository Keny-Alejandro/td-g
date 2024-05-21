import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioCalificacionService } from './usuario_calificacion.service';
import { CreateUsuarioCalificacionDto } from './dto/create-usuario_calificacion.dto';
import { UpdateUsuarioCalificacionDto } from './dto/update-usuario_calificacion.dto';

@Controller('usuario-calificacion')
export class UsuarioCalificacionController {
  constructor(private readonly usuarioCalificacionService: UsuarioCalificacionService) {}

  @Post()
  create(@Body() createUsuarioCalificacionDto: CreateUsuarioCalificacionDto) {
    return this.usuarioCalificacionService.create(createUsuarioCalificacionDto);
  }

  @Get()
  findAll() {
    return this.usuarioCalificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioCalificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioCalificacionDto: UpdateUsuarioCalificacionDto) {
    return this.usuarioCalificacionService.update(+id, updateUsuarioCalificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioCalificacionService.remove(+id);
  }
}
