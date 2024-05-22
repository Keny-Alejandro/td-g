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
  ) {}

  async findByUser(user: number): Promise<UsuarioCalificacion[]> {
    return await this.usuarioCalificacionRepository.find({ where: { user } });
  }

  async actualizarCalificaciones(calificaciones: UsuarioCalificacion[]): Promise<void> {
    try {
      for (const calificacion of calificaciones) {
        const { user, entrega, calificacion: calificacionValor } = calificacion;
        let usuarioCalificacion = await this.usuarioCalificacionRepository.findOne({ where: { user, entrega } });
  
        if (!usuarioCalificacion) {
          usuarioCalificacion = new UsuarioCalificacion();
          usuarioCalificacion.user = user;
          usuarioCalificacion.entrega = entrega;
        }
  
        usuarioCalificacion.calificacion = calificacionValor;
        await this.usuarioCalificacionRepository.save(usuarioCalificacion);
      }
    } catch (error) {
      console.error('Error al actualizar calificaciones:', error);
      throw new Error('Ocurrió un error al actualizar las calificaciones');
    }
  }
  
}
