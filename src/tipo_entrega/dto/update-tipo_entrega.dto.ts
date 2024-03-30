import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEntregaDto } from './create-tipo_entrega.dto';

export class UpdateTipoEntregaDto extends PartialType(CreateTipoEntregaDto) {}
