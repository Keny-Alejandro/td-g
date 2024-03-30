import { PartialType } from '@nestjs/mapped-types';
import { CreateHoraSemanalDto } from './create-hora_semanal.dto';

export class UpdateHoraSemanalDto extends PartialType(CreateHoraSemanalDto) {}
