/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { SeguimientoPpiService } from './seguimiento_ppi.service';

@Controller('seguimiento-ppi')
export class SeguimientoPpiController {
  constructor(private readonly seguimientoPpiService: SeguimientoPpiService) {}

  @Get()
  findAll() {
    return this.seguimientoPpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguimientoPpiService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguimientoPpiService.remove(+id);
  }
}
