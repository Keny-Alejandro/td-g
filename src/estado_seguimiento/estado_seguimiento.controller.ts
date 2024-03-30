import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoSeguimientoService } from './estado_seguimiento.service';
import { CreateEstadoSeguimientoDto } from './dto/create-estado_seguimiento.dto';
import { UpdateEstadoSeguimientoDto } from './dto/update-estado_seguimiento.dto';

@Controller('estado-seguimiento')
export class EstadoSeguimientoController {
  constructor(private readonly estadoSeguimientoService: EstadoSeguimientoService) {}

  @Post()
  create(@Body() createEstadoSeguimientoDto: CreateEstadoSeguimientoDto) {
    return this.estadoSeguimientoService.create(createEstadoSeguimientoDto);
  }

  @Get()
  findAll() {
    return this.estadoSeguimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoSeguimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoSeguimientoDto: UpdateEstadoSeguimientoDto) {
    return this.estadoSeguimientoService.update(+id, updateEstadoSeguimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoSeguimientoService.remove(+id);
  }
}
