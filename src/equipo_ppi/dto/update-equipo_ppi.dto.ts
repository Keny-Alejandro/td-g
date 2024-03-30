import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoPpiDto } from './create-equipo_ppi.dto';

export class UpdateEquipoPpiDto extends PartialType(CreateEquipoPpiDto) {}
