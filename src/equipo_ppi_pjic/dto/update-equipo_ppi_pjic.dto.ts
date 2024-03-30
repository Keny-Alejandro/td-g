import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoPpiPjicDto } from './create-equipo_ppi_pjic.dto';

export class UpdateEquipoPpiPjicDto extends PartialType(CreateEquipoPpiPjicDto) {}
