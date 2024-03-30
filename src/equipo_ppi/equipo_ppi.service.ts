import { Injectable } from '@nestjs/common';
import { CreateEquipoPpiDto } from './dto/create-equipo_ppi.dto';
import { UpdateEquipoPpiDto } from './dto/update-equipo_ppi.dto';

@Injectable()
export class EquipoPpiService {
  create(createEquipoPpiDto: CreateEquipoPpiDto) {
    return 'This action adds a new equipoPpi';
  }

  findAll() {
    return `This action returns all equipoPpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoPpi`;
  }

  update(id: number, updateEquipoPpiDto: UpdateEquipoPpiDto) {
    return `This action updates a #${id} equipoPpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoPpi`;
  }
}
