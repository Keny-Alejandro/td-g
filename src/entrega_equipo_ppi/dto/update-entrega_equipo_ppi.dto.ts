import { PartialType } from '@nestjs/mapped-types';
import { CreateEntregaEquipoPpiDto } from './create-entrega_equipo_ppi.dto';

export class UpdateEntregaEquipoPpiDto extends PartialType(CreateEntregaEquipoPpiDto) {}
