import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguimientoPpiDto } from './create-seguimiento_ppi.dto';

export class UpdateSeguimientoPpiDto extends PartialType(CreateSeguimientoPpiDto) {}
