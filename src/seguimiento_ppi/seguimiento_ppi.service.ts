import { Injectable } from '@nestjs/common';
import { CreateSeguimientoPpiDto } from './dto/create-seguimiento_ppi.dto';
import { UpdateSeguimientoPpiDto } from './dto/update-seguimiento_ppi.dto';

@Injectable()
export class SeguimientoPpiService {
  create(createSeguimientoPpiDto: CreateSeguimientoPpiDto) {
    return 'This action adds a new seguimientoPpi';
  }

  findAll() {
    return `This action returns all seguimientoPpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seguimientoPpi`;
  }

  update(id: number, updateSeguimientoPpiDto: UpdateSeguimientoPpiDto) {
    return `This action updates a #${id} seguimientoPpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} seguimientoPpi`;
  }
}
