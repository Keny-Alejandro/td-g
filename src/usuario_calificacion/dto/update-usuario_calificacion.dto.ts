import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioCalificacionDto } from './create-usuario_calificacion.dto';

export class UpdateUsuarioCalificacionDto extends PartialType(CreateUsuarioCalificacionDto) {}
