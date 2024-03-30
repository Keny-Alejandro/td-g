import { Injectable } from '@nestjs/common';
import { CreateEstadoSeguimientoCambioDto } from './dto/create-estado_seguimiento_cambio.dto';
import { UpdateEstadoSeguimientoCambioDto } from './dto/update-estado_seguimiento_cambio.dto';

@Injectable()
export class EstadoSeguimientoCambioService {
  create(createEstadoSeguimientoCambioDto: CreateEstadoSeguimientoCambioDto) {
    return 'This action adds a new estadoSeguimientoCambio';
  }

  findAll() {
    return `This action returns all estadoSeguimientoCambio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoSeguimientoCambio`;
  }

  update(id: number, updateEstadoSeguimientoCambioDto: UpdateEstadoSeguimientoCambioDto) {
    return `This action updates a #${id} estadoSeguimientoCambio`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoSeguimientoCambio`;
  }
}
