import { Injectable } from '@nestjs/common';
import { CreateConfiguracionEntregaDto } from './dto/create-configuracion_entrega.dto';
import { UpdateConfiguracionEntregaDto } from './dto/update-configuracion_entrega.dto';

@Injectable()
export class ConfiguracionEntregaService {
  create(createConfiguracionEntregaDto: CreateConfiguracionEntregaDto) {
    return 'This action adds a new configuracionEntrega';
  }

  findAll() {
    return `This action returns all configuracionEntrega`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configuracionEntrega`;
  }

  update(id: number, updateConfiguracionEntregaDto: UpdateConfiguracionEntregaDto) {
    return `This action updates a #${id} configuracionEntrega`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuracionEntrega`;
  }
}
