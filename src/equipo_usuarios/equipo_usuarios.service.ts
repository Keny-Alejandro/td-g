import { Injectable } from '@nestjs/common';
import { CreateEquipoUsuarioDto } from './dto/create-equipo_usuario.dto';
import { UpdateEquipoUsuarioDto } from './dto/update-equipo_usuario.dto';

@Injectable()
export class EquipoUsuariosService {
  create(createEquipoUsuarioDto: CreateEquipoUsuarioDto) {
    return 'This action adds a new equipoUsuario';
  }

  findAll() {
    return `This action returns all equipoUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoUsuario`;
  }

  update(id: number, updateEquipoUsuarioDto: UpdateEquipoUsuarioDto) {
    return `This action updates a #${id} equipoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoUsuario`;
  }
}
