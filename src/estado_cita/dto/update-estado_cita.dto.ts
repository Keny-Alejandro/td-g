import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoCitaDto } from './create-estado_cita.dto';

export class UpdateEstadoCitaDto extends PartialType(CreateEstadoCitaDto) {}
