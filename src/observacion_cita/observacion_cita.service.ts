import { Injectable } from '@nestjs/common';
import { CreateObservacionCitaDto } from './dto/create-observacion_cita.dto';
import { UpdateObservacionCitaDto } from './dto/update-observacion_cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservacionCita } from './entities/observacion_cita.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ObservacionCitaService {

  constructor(@InjectRepository(ObservacionCita) private readonly repository: Repository<ObservacionCita>) { }

  create(createObservacionCitaDto: CreateObservacionCitaDto) {
    return 'This action adds a new observacionCita';
  }

  async findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} observacionCita`;
  }

  update(id: number, updateObservacionCitaDto: UpdateObservacionCitaDto) {
    return `This action updates a #${id} observacionCita`;
  }

  remove(id: number) {
    return `This action removes a #${id} observacionCita`;
  }
}
