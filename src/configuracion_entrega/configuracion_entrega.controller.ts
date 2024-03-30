import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';
import { CreateConfiguracionEntregaDto } from './dto/create-configuracion_entrega.dto';
import { UpdateConfiguracionEntregaDto } from './dto/update-configuracion_entrega.dto';

@Controller('configuracion-entrega')
export class ConfiguracionEntregaController {
  constructor(private readonly configuracionEntregaService: ConfiguracionEntregaService) {}

  @Post()
  create(@Body() createConfiguracionEntregaDto: CreateConfiguracionEntregaDto) {
    return this.configuracionEntregaService.create(createConfiguracionEntregaDto);
  }

  @Get()
  findAll() {
    return this.configuracionEntregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configuracionEntregaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfiguracionEntregaDto: UpdateConfiguracionEntregaDto) {
    return this.configuracionEntregaService.update(+id, updateConfiguracionEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configuracionEntregaService.remove(+id);
  }
}
