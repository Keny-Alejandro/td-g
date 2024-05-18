/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaEquipoPpi } from './entities/entrega_equipo_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { ConfiguracionEntrega } from '../configuracion_entrega/entities/configuracion_entrega.entity';

@Injectable()
export class EntregaEquipoPpiService {
  constructor(
    @InjectRepository(EntregaEquipoPpi)
    private readonly entregaRepository: Repository<EntregaEquipoPpi>,
    @InjectRepository(EquipoPpi)
    private readonly bitacoraPpiRepository: Repository<EquipoPpi>,
    @InjectRepository(ConfiguracionEntrega)
    private readonly configuracionEntregaRepository: Repository<ConfiguracionEntrega>,
  ) { }

  async createEntrega(data: {
    ubicacion: string;
    bitacoraPpiId: number;
    configuracionEntregaId: number;
  }): Promise<EntregaEquipoPpi> {
    const { ubicacion, bitacoraPpiId, configuracionEntregaId } = data;

    // Obtén el objeto BitacoraPpi y ConfiguracionEntrega a partir de sus IDs
    const equipoentrega = await this.bitacoraPpiRepository.findOne({ where: { id: bitacoraPpiId } });
    const configuracionentrega = await this.configuracionEntregaRepository.findOne({ where: { id: configuracionEntregaId } });

    // Crea la entrega utilizando los objetos relacionados
    const entrega = this.entregaRepository.create({
      ubicacion,
      equipoentrega,
      configuracionentrega,
    });

    // Guarda la entrega en la base de datos
    return await this.entregaRepository.save(entrega);
  }

  async getEntregasByCodigoEquipo(codigoEquipo: number) {
    return this.entregaRepository
      .createQueryBuilder('eep')
      .select([
        'ce.Tipo_Entrega_ID',
        'te.Tipo_Entrega_Descripcion',
        'bp.Codigo_Equipo',
        'eep.Ubicacion_Entrega',
        'eep.Calificacion_Entrega',
        'ce.Porcentaje_Entrega',
        'eep.Entrega_Equipo_PPI_ID',
        'ce.Plazo_Entrega'
      ])
      .innerJoin('Bitacora_PPI', 'bp', 'bp.Bitacora_PPI_ID = eep.Bitacora_PPI_ID')
      .innerJoin('Configuracion_Entrega', 'ce', 'ce.Configuracion_Entrega_ID = eep.Configuracion_Entrega_ID')
      .innerJoin('Tipo_Entrega', 'te', 'te.Tipo_Entrega_ID = ce.Tipo_Entrega_ID')
      .where('bp.Codigo_Equipo = :codigoEquipo', { codigoEquipo })
      .getRawMany();
  }

  async postNotas(data: { Entrega_Equipo_PPI_ID: number, Calificacion: number }[]) {
    for (const { Entrega_Equipo_PPI_ID, Calificacion } of data) {
      await this.entregaRepository.update(
        { id: Entrega_Equipo_PPI_ID },
        { calificacion: Calificacion }
      );
    }
    return 'Calificaciones actualizadas correctamente';
  }

  async getAllEntregas() {
    return this.entregaRepository
      .createQueryBuilder('eep')
      .select([
        'ce.Tipo_Entrega_ID',
        'te.Tipo_Entrega_Descripcion',
        'bp.Codigo_Equipo',
        'eep.Ubicacion_Entrega',
        'eep.Calificacion_Entrega',
        'ce.Porcentaje_Entrega',
        'eep.Entrega_Equipo_PPI_ID',
        'ce.Plazo_Entrega'
      ])
      .innerJoin('Bitacora_PPI', 'bp', 'bp.Bitacora_PPI_ID = eep.Bitacora_PPI_ID')
      .innerJoin('Configuracion_Entrega', 'ce', 'ce.Configuracion_Entrega_ID = eep.Configuracion_Entrega_ID')
      .innerJoin('Tipo_Entrega', 'te', 'te.Tipo_Entrega_ID = ce.Tipo_Entrega_ID')
      .getRawMany();
  }

  async deleteEntrega(id: number) {
    const entrega = await this.entregaRepository.findOneOrFail({
      where: { id: id },
    });

    // Elimina la entrega de la base de datos
    await this.entregaRepository.remove(entrega);

    return 'Entrega eliminada correctamente';
  }

}
