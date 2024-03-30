import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoSeguimientoCambioService } from './estado_seguimiento_cambio.service';
import { CreateEstadoSeguimientoCambioDto } from './dto/create-estado_seguimiento_cambio.dto';
import { UpdateEstadoSeguimientoCambioDto } from './dto/update-estado_seguimiento_cambio.dto';

@Controller('estado-seguimiento-cambio')
export class EstadoSeguimientoCambioController {
  constructor(private readonly estadoSeguimientoCambioService: EstadoSeguimientoCambioService) {}

  @Post()
  create(@Body() createEstadoSeguimientoCambioDto: CreateEstadoSeguimientoCambioDto) {
    return this.estadoSeguimientoCambioService.create(createEstadoSeguimientoCambioDto);
  }

  @Get()
  findAll() {
    return this.estadoSeguimientoCambioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoSeguimientoCambioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoSeguimientoCambioDto: UpdateEstadoSeguimientoCambioDto) {
    return this.estadoSeguimientoCambioService.update(+id, updateEstadoSeguimientoCambioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoSeguimientoCambioService.remove(+id);
  }
}
