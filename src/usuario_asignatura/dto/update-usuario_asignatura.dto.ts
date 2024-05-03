import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioAsignaturaDto } from './create-usuario_asignatura.dto';

export class UpdateUsuarioAsignaturaDto extends PartialType(CreateUsuarioAsignaturaDto) {}
