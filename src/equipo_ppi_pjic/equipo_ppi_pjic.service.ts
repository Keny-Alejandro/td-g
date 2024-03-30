import { Injectable } from '@nestjs/common';
import { CreateEquipoPpiPjicDto } from './dto/create-equipo_ppi_pjic.dto';
import { UpdateEquipoPpiPjicDto } from './dto/update-equipo_ppi_pjic.dto';

@Injectable()
export class EquipoPpiPjicService {
  create(createEquipoPpiPjicDto: CreateEquipoPpiPjicDto) {
    return 'This action adds a new equipoPpiPjic';
  }

  findAll() {
    return `This action returns all equipoPpiPjic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoPpiPjic`;
  }

  update(id: number, updateEquipoPpiPjicDto: UpdateEquipoPpiPjicDto) {
    return `This action updates a #${id} equipoPpiPjic`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoPpiPjic`;
  }
}
