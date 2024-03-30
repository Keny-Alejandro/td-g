import { Injectable } from '@nestjs/common';
import { CreateTipoCitaDto } from './dto/create-tipo_cita.dto';
import { UpdateTipoCitaDto } from './dto/update-tipo_cita.dto';

@Injectable()
export class TipoCitaService {
  create(createTipoCitaDto: CreateTipoCitaDto) {
    return 'This action adds a new tipoCita';
  }

  findAll() {
    return `This action returns all tipoCita`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCita`;
  }

  update(id: number, updateTipoCitaDto: UpdateTipoCitaDto) {
    return `This action updates a #${id} tipoCita`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCita`;
  }
}
