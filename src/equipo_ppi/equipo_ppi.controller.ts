import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';
import { CreateEquipoPpiDto } from './dto/create-equipo_ppi.dto';
import { UpdateEquipoPpiDto } from './dto/update-equipo_ppi.dto';

@Controller('equipo-ppi')
export class EquipoPpiController {
  constructor(private readonly equipoPpiService: EquipoPpiService) {}

  @Post()
  create(@Body() createEquipoPpiDto: CreateEquipoPpiDto) {
    return this.equipoPpiService.create(createEquipoPpiDto);
  }

  @Get()
  findAll() {
    return this.equipoPpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoPpiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoPpiDto: UpdateEquipoPpiDto) {
    return this.equipoPpiService.update(+id, updateEquipoPpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoPpiService.remove(+id);
  }
}
