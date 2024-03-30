import { Injectable } from '@nestjs/common';
import { CreateHoraSemanalDto } from './dto/create-hora_semanal.dto';
import { UpdateHoraSemanalDto } from './dto/update-hora_semanal.dto';

@Injectable()
export class HoraSemanalService {
  create(createHoraSemanalDto: CreateHoraSemanalDto) {
    return 'This action adds a new horaSemanal';
  }

  findAll() {
    return `This action returns all horaSemanal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horaSemanal`;
  }

  update(id: number, updateHoraSemanalDto: UpdateHoraSemanalDto) {
    return `This action updates a #${id} horaSemanal`;
  }

  remove(id: number) {
    return `This action removes a #${id} horaSemanal`;
  }
}
