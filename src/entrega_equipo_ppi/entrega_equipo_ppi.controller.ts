/* eslint-disable prettier/prettier */
import {
  Controller,
} from '@nestjs/common';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';

@Controller('entrega-equipo-ppi')
export class EntregaEquipoPpiController {
  constructor(
    private readonly entregaEquipoPpiService: EntregaEquipoPpiService,
  ) {}
}
