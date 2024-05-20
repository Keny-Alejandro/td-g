/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoPpiPjic } from './entities/equipo_ppi_pjic.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class EquipoPpiPjicService {
  constructor(
    @InjectRepository(EquipoPpiPjic)
    private readonly equipoPpiPjicRepository: Repository<EquipoPpiPjic>,
    @InjectRepository(Usuario) // Inyecta el repositorio de Usuario
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async getEquipoPpiPjicData() {
    return this.equipoPpiPjicRepository.createQueryBuilder('equipoPpiPjic')
      .leftJoinAndSelect('equipoPpiPjic.usuariopjic', 'usuario')
      .select(['equipoPpiPjic.codigoEquipo', 'usuario.id'])
      .getMany();
  }

  async guardarAsesores(data: { codigoEquipo: number; usuario_id: number }[]) {
    for (const { codigoEquipo, usuario_id } of data) {
      let equipo = await this.equipoPpiPjicRepository.findOne({ where: { codigoEquipo } });
      if (!equipo) {
        equipo = new EquipoPpiPjic();
        equipo.codigoEquipo = codigoEquipo;
      }
      // Buscar el usuario por su id
      const usuario = await this.usuarioRepository.findOne({ where: { id: usuario_id } });
      if (!usuario) {
        throw new Error(`Usuario con id ${usuario_id} no encontrado`);
      }
      equipo.usuariopjic = usuario;
      await this.equipoPpiPjicRepository.save(equipo);
    }
  }

  async findOne(id: number) {
    return this.equipoPpiPjicRepository
      .createQueryBuilder('equipoPpiPjic')
      .leftJoinAndSelect('equipoPpiPjic.usuariopjic', 'usuario')
      .where('equipoPpiPjic.codigoEquipo = :id', { id: id })
      .getOne();
  }

}
