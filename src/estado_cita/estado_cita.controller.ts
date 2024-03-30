import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoCitaService } from './estado_cita.service';
import { CreateEstadoCitaDto } from './dto/create-estado_cita.dto';
import { UpdateEstadoCitaDto } from './dto/update-estado_cita.dto';

@Controller('estado-cita')
export class EstadoCitaController {
  constructor(private readonly estadoCitaService: EstadoCitaService) {}

  @Post()
  create(@Body() createEstadoCitaDto: CreateEstadoCitaDto) {
    return this.estadoCitaService.create(createEstadoCitaDto);
  }

  @Get()
  findAll() {
    return this.estadoCitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoCitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoCitaDto: UpdateEstadoCitaDto) {
    return this.estadoCitaService.update(+id, updateEstadoCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoCitaService.remove(+id);
  }
}
