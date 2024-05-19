/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';
import { CreateEquipoPpiDto } from './dto/create-equipo_ppi.dto';
import { UpdateEquipoPpiDto } from './dto/update-equipo_ppi.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('equipo-ppi')
@Controller('equipo-ppi')
export class EquipoPpiController {
  constructor(private readonly equipoPpiService: EquipoPpiService) { }

  @Post()
  create(@Body() createEquipoPpiDto: CreateEquipoPpiDto) {
    return this.equipoPpiService.create(createEquipoPpiDto);
  }

  @Get('GetBitacoraByCode/:id')
  async obtenerBitacoraGrupo(@Param('id') id: number) {
    try {
      const bitacoraGrupo =
        await this.equipoPpiService.obtenerBitacoraGrupo(id);
      return bitacoraGrupo;
    } catch (error) {
      return { error: 'Error al obtener la bitácora del grupo' };
    }
  }

  @Get('exportar/:id')
  async exportar(@Param('id') id: string) {
    return this.equipoPpiService.exportData(+id);
  }

  @Get()
  findAll() {
    return this.equipoPpiService.findAll();
  }

  @Get('/Equipo/:id')
  findByEquipo(@Param('id') id: string) {
    return this.equipoPpiService.findByEquipo(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoPpiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipoPpiDto: UpdateEquipoPpiDto,
  ) {
    return this.equipoPpiService.update(+id, updateEquipoPpiDto);
  }
}
