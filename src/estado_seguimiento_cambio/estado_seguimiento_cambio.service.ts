import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoSeguimientoCambioDto } from './dto/create-estado_seguimiento_cambio.dto';
import { UpdateEstadoSeguimientoCambioDto } from './dto/update-estado_seguimiento_cambio.dto';
import { EstadoSeguimientoCambio } from './entities/estado_seguimiento_cambio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoSeguimientoCambioService {
  constructor(
    @InjectRepository(EstadoSeguimientoCambio) private readonly repository: Repository<EstadoSeguimientoCambio>
  ) {
  }


 async  create(createEstadoSeguimientoCambioDto: CreateEstadoSeguimientoCambioDto) {
    return this.repository.save(createEstadoSeguimientoCambioDto);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.createQueryBuilder('EstadoSeguimientoCambio')
      .where('EstadoSeguimientoCambio.seguimiento = :seguimiento', { seguimiento: id })
      .orderBy('EstadoSeguimientoCambio.fecha', 'DESC')
      .getOne();
  }

  async findById(id: number) {
    return await this.repository.createQueryBuilder('EstadoSeguimientoCambio')
      .leftJoinAndSelect('EstadoSeguimientoCambio.estadoSeguimiento', 'EstadoSeguimiento')
      .where('EstadoSeguimientoCambio.id = :id', { id: id })
      .getOne();
  }

  async findBySeguimiento(id: number) {
    return await this.repository.createQueryBuilder('EstadoSeguimientoCambio')
      .leftJoinAndSelect('EstadoSeguimientoCambio.estadoSeguimiento', 'EstadoSeguimiento')
      .where('EstadoSeguimientoCambio.seguimiento = :seguimiento', { seguimiento: id })
      .orderBy('EstadoSeguimientoCambio.fecha', 'DESC')
      .getOne();
  }

  async update(id: number, updateEstadoSeguimientoCambioDto: UpdateEstadoSeguimientoCambioDto) {
    const existe = await this.repository.find({ where: { id } });
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateEstadoSeguimientoCambioDto);
  }

  async removeByCita(id: number) {
    console.log(id)
    const exist = await this.repository
      .createQueryBuilder('EstadoSeguimientoCambio')
      .leftJoinAndSelect('EstadoSeguimientoCambio.seguimiento', 'seguimiento_ppi')
      .where('seguimiento_ppi.citas = :citas', { citas: id })
      .getOne()
    console.log(exist)
    if (!exist) {
      throw new NotFoundException();
    }
    return await this.repository.remove(exist);
  }

  remove(id: number) {

  }
}
