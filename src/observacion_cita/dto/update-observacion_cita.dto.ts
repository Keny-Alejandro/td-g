import { PartialType } from '@nestjs/mapped-types';
import { CreateObservacionCitaDto } from './create-observacion_cita.dto';

export class UpdateObservacionCitaDto extends PartialType(CreateObservacionCitaDto) {}
