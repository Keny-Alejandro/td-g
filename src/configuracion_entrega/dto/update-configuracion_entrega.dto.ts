import { PartialType } from '@nestjs/mapped-types';
import { CreateConfiguracionEntregaDto } from './create-configuracion_entrega.dto';

export class UpdateConfiguracionEntregaDto extends PartialType(CreateConfiguracionEntregaDto) {}
