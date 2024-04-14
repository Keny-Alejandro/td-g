/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  /*create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }*/

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.query('SELECT * FROM "Usuario" u');
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  /*update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
