import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoraSemanalService } from './hora_semanal.service';
import { CreateHoraSemanalDto } from './dto/create-hora_semanal.dto';
import { UpdateHoraSemanalDto } from './dto/update-hora_semanal.dto';

@Controller('hora-semanal')
export class HoraSemanalController {
  constructor(private readonly horaSemanalService: HoraSemanalService) { }

  @Post()
  create(@Body() createHoraSemanalDto: CreateHoraSemanalDto) {
    return this.horaSemanalService.create(createHoraSemanalDto);
  }
  
  @Get('/exportar')
  exportarCitasProfesor() {
    return this.horaSemanalService.exportarCitasProfesor();
  }

  @Get()
  findAll() {
    return this.horaSemanalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horaSemanalService.findOne(+id);
  }

  @Get('/profesor/:id')
  findProfesor(@Param('id') id: string) {
    return this.horaSemanalService.findProfesor(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoraSemanalDto: UpdateHoraSemanalDto) {
    return this.horaSemanalService.update(+id, updateHoraSemanalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horaSemanalService.remove(+id);
  }
}
