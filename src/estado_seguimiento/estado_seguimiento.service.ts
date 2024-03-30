import { Injectable } from '@nestjs/common';
import { CreateEstadoSeguimientoDto } from './dto/create-estado_seguimiento.dto';
import { UpdateEstadoSeguimientoDto } from './dto/update-estado_seguimiento.dto';

@Injectable()
export class EstadoSeguimientoService {
  create(createEstadoSeguimientoDto: CreateEstadoSeguimientoDto) {
    return 'This action adds a new estadoSeguimiento';
  }

  findAll() {
    return `This action returns all estadoSeguimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoSeguimiento`;
  }

  update(id: number, updateEstadoSeguimientoDto: UpdateEstadoSeguimientoDto) {
    return `This action updates a #${id} estadoSeguimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoSeguimiento`;
  }
}
