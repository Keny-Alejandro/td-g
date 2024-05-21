import { Injectable } from '@nestjs/common';
import { CreateUsuarioCalificacionDto } from './dto/create-usuario_calificacion.dto';
import { UpdateUsuarioCalificacionDto } from './dto/update-usuario_calificacion.dto';

@Injectable()
export class UsuarioCalificacionService {
  create(createUsuarioCalificacionDto: CreateUsuarioCalificacionDto) {
    return 'This action adds a new usuarioCalificacion';
  }

  findAll() {
    return `This action returns all usuarioCalificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioCalificacion`;
  }

  update(id: number, updateUsuarioCalificacionDto: UpdateUsuarioCalificacionDto) {
    return `This action updates a #${id} usuarioCalificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioCalificacion`;
  }
}
