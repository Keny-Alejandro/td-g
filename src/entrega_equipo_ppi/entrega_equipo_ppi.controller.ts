import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';
import { CreateEntregaEquipoPpiDto } from './dto/create-entrega_equipo_ppi.dto';
import { UpdateEntregaEquipoPpiDto } from './dto/update-entrega_equipo_ppi.dto';

@Controller('entrega-equipo-ppi')
export class EntregaEquipoPpiController {
  constructor(private readonly entregaEquipoPpiService: EntregaEquipoPpiService) {}

  @Post()
  create(@Body() createEntregaEquipoPpiDto: CreateEntregaEquipoPpiDto) {
    return this.entregaEquipoPpiService.create(createEntregaEquipoPpiDto);
  }

  @Get()
  findAll() {
    return this.entregaEquipoPpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaEquipoPpiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregaEquipoPpiDto: UpdateEntregaEquipoPpiDto) {
    return this.entregaEquipoPpiService.update(+id, updateEntregaEquipoPpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregaEquipoPpiService.remove(+id);
  }
}
