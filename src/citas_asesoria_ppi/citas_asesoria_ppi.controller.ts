import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitasAsesoriaPpiService } from './citas_asesoria_ppi.service';
import { CreateCitasAsesoriaPpiDto } from './dto/create-citas_asesoria_ppi.dto';
import { UpdateCitasAsesoriaPpiDto } from './dto/update-citas_asesoria_ppi.dto';

@Controller('citas-asesoria-ppi')
export class CitasAsesoriaPpiController {
  constructor(private readonly citasAsesoriaPpiService: CitasAsesoriaPpiService) {}

  @Post()
  create(@Body() createCitasAsesoriaPpiDto: CreateCitasAsesoriaPpiDto) {
    return this.citasAsesoriaPpiService.create(createCitasAsesoriaPpiDto);
  }

  @Get()
  findAll() {
    return this.citasAsesoriaPpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasAsesoriaPpiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitasAsesoriaPpiDto: UpdateCitasAsesoriaPpiDto) {
    return this.citasAsesoriaPpiService.update(+id, updateCitasAsesoriaPpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasAsesoriaPpiService.remove(+id);
  }
}
