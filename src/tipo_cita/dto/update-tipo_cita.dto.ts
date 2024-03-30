import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCitaDto } from './create-tipo_cita.dto';

export class UpdateTipoCitaDto extends PartialType(CreateTipoCitaDto) {}
