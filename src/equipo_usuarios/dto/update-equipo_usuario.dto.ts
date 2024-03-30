import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoUsuarioDto } from './create-equipo_usuario.dto';

export class UpdateEquipoUsuarioDto extends PartialType(CreateEquipoUsuarioDto) {}
