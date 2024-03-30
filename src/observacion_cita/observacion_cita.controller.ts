import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObservacionCitaService } from './observacion_cita.service';
import { CreateObservacionCitaDto } from './dto/create-observacion_cita.dto';
import { UpdateObservacionCitaDto } from './dto/update-observacion_cita.dto';

@Controller('observacion-cita')
export class ObservacionCitaController {
  constructor(private readonly observacionCitaService: ObservacionCitaService) {}

  @Post()
  create(@Body() createObservacionCitaDto: CreateObservacionCitaDto) {
    return this.observacionCitaService.create(createObservacionCitaDto);
  }

  @Get()
  findAll() {
    return this.observacionCitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observacionCitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObservacionCitaDto: UpdateObservacionCitaDto) {
    return this.observacionCitaService.update(+id, updateObservacionCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.observacionCitaService.remove(+id);
  }
}
