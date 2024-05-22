/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioCalificacion } from './entities/usuario_calificacion.entity';

@Injectable()
export class UsuarioCalificacionService {

  constructor(
    @InjectRepository(UsuarioCalificacion)
    private readonly usuarioCalificacionRepository: Repository<UsuarioCalificacion>,
  ) { }

  async findByUser(user: number): Promise<UsuarioCalificacion[]> {
    return await this.usuarioCalificacionRepository.find({ where: { user } });
  }
}
