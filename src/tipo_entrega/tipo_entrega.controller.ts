/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
} from '@nestjs/common';
import { TipoEntregaService } from './tipo_entrega.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-entrega')
@Controller('tipo-entrega')
export class TipoEntregaController {
  constructor(private readonly tipoEntregaService: TipoEntregaService) {}

  @Get('GetAllEntregas')
  async findAll() {
    return this.tipoEntregaService.findAll();
  }
}
