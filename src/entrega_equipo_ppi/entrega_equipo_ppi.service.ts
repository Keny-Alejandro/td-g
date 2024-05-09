/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaEquipoPpi } from './entities/entrega_equipo_ppi.entity';

@Injectable()
export class EntregaEquipoPpiService {
    constructor(
        @InjectRepository(EntregaEquipoPpi)
        private entregaRepository: Repository<EntregaEquipoPpi>,
    ) { }

    async createEntrega(data: {
        ubicacion: string;
        bitacoraPpiId: number;
        configuracionEntregaId: number;
    }): Promise<EntregaEquipoPpi> {
        const { ubicacion, bitacoraPpiId, configuracionEntregaId } = data;
        const entrega = this.entregaRepository.create({
            ubicacion,
            equipoentrega: { id: bitacoraPpiId },
            configuracionentrega: { id: configuracionEntregaId },
        });
        return await this.entregaRepository.save(entrega);
    }
}
