import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoSeguimientoDto } from './create-estado_seguimiento.dto';

export class UpdateEstadoSeguimientoDto extends PartialType(CreateEstadoSeguimientoDto) {}
