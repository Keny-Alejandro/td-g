import { Injectable } from '@nestjs/common';
import { CreateObservacionCitaDto } from './dto/create-observacion_cita.dto';
import { UpdateObservacionCitaDto } from './dto/update-observacion_cita.dto';

@Injectable()
export class ObservacionCitaService {
  create(createObservacionCitaDto: CreateObservacionCitaDto) {
    return 'This action adds a new observacionCita';
  }

  findAll() {
    return `This action returns all observacionCita`;
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
