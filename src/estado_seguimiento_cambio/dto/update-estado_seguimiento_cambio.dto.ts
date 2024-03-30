import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoSeguimientoCambioDto } from './create-estado_seguimiento_cambio.dto';

export class UpdateEstadoSeguimientoCambioDto extends PartialType(CreateEstadoSeguimientoCambioDto) {}
