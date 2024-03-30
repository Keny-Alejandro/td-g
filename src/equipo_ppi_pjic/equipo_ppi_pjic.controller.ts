import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';
import { CreateEquipoPpiPjicDto } from './dto/create-equipo_ppi_pjic.dto';
import { UpdateEquipoPpiPjicDto } from './dto/update-equipo_ppi_pjic.dto';

@Controller('equipo-ppi-pjic')
export class EquipoPpiPjicController {
  constructor(private readonly equipoPpiPjicService: EquipoPpiPjicService) {}

  @Post()
  create(@Body() createEquipoPpiPjicDto: CreateEquipoPpiPjicDto) {
    return this.equipoPpiPjicService.create(createEquipoPpiPjicDto);
  }

  @Get()
  findAll() {
    return this.equipoPpiPjicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoPpiPjicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoPpiPjicDto: UpdateEquipoPpiPjicDto) {
    return this.equipoPpiPjicService.update(+id, updateEquipoPpiPjicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoPpiPjicService.remove(+id);
  }
}
