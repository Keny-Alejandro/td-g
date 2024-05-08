/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BitacoraPpi } from './entities/equipo_ppi.entity';

@Injectable()
export class EquipoPpiService {
    constructor(
        @InjectRepository(BitacoraPpi)
        private bitacoraRepository: Repository<BitacoraPpi>,
      ) { }

    async obtenerBitacoraGrupo(id: number): Promise<any[]> {
        const query = `
          SELECT
            b."Codigo_Equipo",
            b."Alias_Proyecto",
            b."Descripcion_Proyecto",
            b."Alcance_Proyecto",
            b."Alcance_Socializacion_Uno",
            b."Alcance_Socializacion_Dos"
          FROM
            "Bitacora_PPI" b
          WHERE
            b."Codigo_Equipo" = $1
          ORDER BY
            b."Codigo_Equipo" ASC;
        `;
        const result = await this.bitacoraRepository.query(query, [id]);
        return result;
      }
}
