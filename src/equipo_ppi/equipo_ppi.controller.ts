/* eslint-disable prettier/prettier */
import {
  Controller,
} from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';

@Controller('equipo-ppi')
export class EquipoPpiController {
  constructor(private readonly equipoPpiService: EquipoPpiService) {}

  

}
