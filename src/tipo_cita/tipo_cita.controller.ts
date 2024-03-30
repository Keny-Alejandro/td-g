import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCitaService } from './tipo_cita.service';
import { CreateTipoCitaDto } from './dto/create-tipo_cita.dto';
import { UpdateTipoCitaDto } from './dto/update-tipo_cita.dto';

@Controller('tipo-cita')
export class TipoCitaController {
  constructor(private readonly tipoCitaService: TipoCitaService) {}

  @Post()
  create(@Body() createTipoCitaDto: CreateTipoCitaDto) {
    return this.tipoCitaService.create(createTipoCitaDto);
  }

  @Get()
  findAll() {
    return this.tipoCitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCitaDto: UpdateTipoCitaDto) {
    return this.tipoCitaService.update(+id, updateTipoCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoCitaService.remove(+id);
  }
}
