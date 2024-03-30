import { Injectable } from '@nestjs/common';
import { CreateEstadoCitaDto } from './dto/create-estado_cita.dto';
import { UpdateEstadoCitaDto } from './dto/update-estado_cita.dto';

@Injectable()
export class EstadoCitaService {
  create(createEstadoCitaDto: CreateEstadoCitaDto) {
    return 'This action adds a new estadoCita';
  }

  findAll() {
    return `This action returns all estadoCita`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoCita`;
  }

  update(id: number, updateEstadoCitaDto: UpdateEstadoCitaDto) {
    return `This action updates a #${id} estadoCita`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoCita`;
  }
}
