import { Injectable } from '@nestjs/common';
import { CreateEntregaEquipoPpiDto } from './dto/create-entrega_equipo_ppi.dto';
import { UpdateEntregaEquipoPpiDto } from './dto/update-entrega_equipo_ppi.dto';

@Injectable()
export class EntregaEquipoPpiService {
  create(createEntregaEquipoPpiDto: CreateEntregaEquipoPpiDto) {
    return 'This action adds a new entregaEquipoPpi';
  }

  findAll() {
    return `This action returns all entregaEquipoPpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entregaEquipoPpi`;
  }

  update(id: number, updateEntregaEquipoPpiDto: UpdateEntregaEquipoPpiDto) {
    return `This action updates a #${id} entregaEquipoPpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} entregaEquipoPpi`;
  }
}
