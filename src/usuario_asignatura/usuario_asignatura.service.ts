import { Injectable } from '@nestjs/common';
import { CreateUsuarioAsignaturaDto } from './dto/create-usuario_asignatura.dto';
import { UpdateUsuarioAsignaturaDto } from './dto/update-usuario_asignatura.dto';

@Injectable()
export class UsuarioAsignaturaService {
  create(createUsuarioAsignaturaDto: CreateUsuarioAsignaturaDto) {
    return 'This action adds a new usuarioAsignatura';
  }

  findAll() {
    return `This action returns all usuarioAsignatura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioAsignatura`;
  }

  update(id: number, updateUsuarioAsignaturaDto: UpdateUsuarioAsignaturaDto) {
    return `This action updates a #${id} usuarioAsignatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioAsignatura`;
  }
}
