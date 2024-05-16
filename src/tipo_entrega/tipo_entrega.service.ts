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
    return this.tipoEntregaRepository.query(`
    SELECT
      te."Tipo_Entrega_ID" as id,
      te."Tipo_Entrega_Descripcion" as nombre,
      ce."Porcentaje_Entrega"
    FROM
      "Tipo_Entrega" te
    INNER JOIN "Configuracion_Entrega" ce ON
      ce."Tipo_Entrega_ID" = te."Tipo_Entrega_ID"
  `);
  }
}
