/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEntrega } from './entities/tipo_entrega.entity';

@Injectable()
export class TipoEntregaService {
  constructor(
    @InjectRepository(TipoEntrega)
    private readonly tipoEntregaRepository: Repository<TipoEntrega>,
  ) {}

  async findAll() {
    return this.tipoEntregaRepository.find();
  }
}
