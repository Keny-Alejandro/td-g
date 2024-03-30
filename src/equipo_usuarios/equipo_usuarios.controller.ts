import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoUsuariosService } from './equipo_usuarios.service';
import { CreateEquipoUsuarioDto } from './dto/create-equipo_usuario.dto';
import { UpdateEquipoUsuarioDto } from './dto/update-equipo_usuario.dto';

@Controller('equipo-usuarios')
export class EquipoUsuariosController {
  constructor(private readonly equipoUsuariosService: EquipoUsuariosService) {}

  @Post()
  create(@Body() createEquipoUsuarioDto: CreateEquipoUsuarioDto) {
    return this.equipoUsuariosService.create(createEquipoUsuarioDto);
  }

  @Get()
  findAll() {
    return this.equipoUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoUsuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoUsuarioDto: UpdateEquipoUsuarioDto) {
    return this.equipoUsuariosService.update(+id, updateEquipoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoUsuariosService.remove(+id);
  }
}
