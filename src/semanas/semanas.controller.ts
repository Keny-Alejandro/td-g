import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemanasService } from './semanas.service';
import { CreateSemanaDto } from './dto/create-semana.dto';
import { UpdateSemanaDto } from './dto/update-semana.dto';

@Controller('semanas')
export class SemanasController {
  constructor(private readonly semanasService: SemanasService) {}

  @Post()
  create(@Body() createSemanaDto: CreateSemanaDto) {
    return this.semanasService.create(createSemanaDto);
  }

  @Get()
  findAll() {
    return this.semanasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semanasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemanaDto: UpdateSemanaDto) {
    return this.semanasService.update(+id, updateSemanaDto);
  }

  @Delete('/eliminarTodo/')
  removeAll() {
    return this.semanasService.removeAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semanasService.remove(+id);
  }

}
