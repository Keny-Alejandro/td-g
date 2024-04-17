/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { EmailDTO } from './dto/email.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findEmail(EmailDTO: EmailDTO): Promise<Usuario[]> {
    const query = 'SELECT * FROM "Usuario" u WHERE u."Usuario_Correo" = $1';
    const usuarios = await this.usuarioRepository.query(query, [EmailDTO.email]);
    
    if (usuarios.length === 0) {
      throw new NotFoundException(`El correo ${EmailDTO.email} no se encuentra registrado`);
    }
  
    return usuarios;
  }  

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
