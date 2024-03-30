import { PartialType } from '@nestjs/mapped-types';
import { CreateCitasAsesoriaPpiDto } from './create-citas_asesoria_ppi.dto';

export class UpdateCitasAsesoriaPpiDto extends PartialType(CreateCitasAsesoriaPpiDto) {}
