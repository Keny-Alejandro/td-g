/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoPpiPjic } from './entities/equipo_ppi_pjic.entity';

@Injectable()
export class EquipoPpiPjicService {
  constructor(
    @InjectRepository(EquipoPpiPjic)
    private readonly equipoPpiPjicRepository: Repository<EquipoPpiPjic>,
  ) { }

  async getEquipoPpiPjicData() {
    return this.equipoPpiPjicRepository.createQueryBuilder('equipoPpiPjic')
      .leftJoinAndSelect('equipoPpiPjic.usuariopjic', 'usuario')
      .select(['equipoPpiPjic.codigoEquipo', 'usuario.id'])
      .getMany();
  }
}
