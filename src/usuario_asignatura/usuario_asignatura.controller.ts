import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioAsignaturaService } from './usuario_asignatura.service';
import { CreateUsuarioAsignaturaDto } from './dto/create-usuario_asignatura.dto';
import { UpdateUsuarioAsignaturaDto } from './dto/update-usuario_asignatura.dto';

@Controller('usuario-asignatura')
export class UsuarioAsignaturaController {
  constructor(private readonly usuarioAsignaturaService: UsuarioAsignaturaService) {}

  @Post()
  create(@Body() createUsuarioAsignaturaDto: CreateUsuarioAsignaturaDto) {
    return this.usuarioAsignaturaService.create(createUsuarioAsignaturaDto);
  }

  @Get()
  findAll() {
    return this.usuarioAsignaturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioAsignaturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioAsignaturaDto: UpdateUsuarioAsignaturaDto) {
    return this.usuarioAsignaturaService.update(+id, updateUsuarioAsignaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioAsignaturaService.remove(+id);
  }
}
