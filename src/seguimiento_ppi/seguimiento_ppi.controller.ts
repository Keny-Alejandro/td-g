import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeguimientoPpiService } from './seguimiento_ppi.service';
import { CreateSeguimientoPpiDto } from './dto/create-seguimiento_ppi.dto';
import { UpdateSeguimientoPpiDto } from './dto/update-seguimiento_ppi.dto';

@Controller('seguimiento-ppi')
export class SeguimientoPpiController {
  constructor(private readonly seguimientoPpiService: SeguimientoPpiService) {}

  @Post()
  create(@Body() createSeguimientoPpiDto: CreateSeguimientoPpiDto) {
    return this.seguimientoPpiService.create(createSeguimientoPpiDto);
  }

  @Get()
  findAll() {
    return this.seguimientoPpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguimientoPpiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeguimientoPpiDto: UpdateSeguimientoPpiDto) {
    return this.seguimientoPpiService.update(+id, updateSeguimientoPpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguimientoPpiService.remove(+id);
  }
}
