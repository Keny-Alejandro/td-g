/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Patch,
  NotFoundException,
  Get,
  Post,
  Param,
  Logger,
  Put
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { EmailDTO } from './dto/email.dto';
import { UpdateUsuarioDTO, CreateUsuariosByAsesorDTO } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UploadStudentsDto } from './dto/upload-students.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioAsignatura } from '../usuario_asignatura/entities/usuario_asignatura.entity';
import { Repository } from 'typeorm';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);
  constructor(
    private readonly usuarioService: UsuarioService,
    @InjectRepository(UsuarioAsignatura)
    private readonly usuarioAsignaturaRepository: Repository<UsuarioAsignatura>,
  ) { }

  @Patch('Auth')
  async findEmail(@Body() payload: EmailDTO) {
    const usuarios = await this.usuarioService.findEmail(payload);

    if (usuarios.length === 0) {
      throw new NotFoundException(`El correo ${payload.email} no se encuentra registrado`);
    }

    return usuarios;
  }

  @Post('LoadStudents')
  async loadStudents(@Body() uploadStudentsDto: UploadStudentsDto): Promise<any> {
    for (const file of uploadStudentsDto.files) {
      const asignatura = await this.usuarioService.findAsignaturaByCodigo(file.codigo);
      if (!asignatura) {
        // Maneja el caso donde la asignatura no se encuentra
        return { message: `Asignatura con código ${file.codigo} no encontrada` };
      }

      const id_asignatura = asignatura.id;
      const id_programa = asignatura.programaId;
      const semestre_asignatura = asignatura.semestre;
      console.log('Asignatura encontrada:', asignatura);

      // Buscar o crear el profesor
      const Usuario_ID_Profesor = await this.usuarioService.findOrCreateProfesor(file, id_programa);
      console.log('Usuario ID del Profesor:', Usuario_ID_Profesor);

      const usuario = await this.usuarioService.findOne(Usuario_ID_Profesor);

      const existingUsuarioAsignatura = await this.usuarioAsignaturaRepository.findOne({
        where: {
          usuarioasignatura: usuario,
          semestre: id_asignatura,
          grupo: Number(file.grupoAsignatura),
        },
      });

      if (existingUsuarioAsignatura) {
        // Si ya existe, no hacer nada
        console.log('El registro ya existe, no se realizará ninguna acción');
        continue;
      }

      const usuarioAsignatura = this.usuarioAsignaturaRepository.create({
        usuarioasignatura: usuario,
        semestre: id_asignatura,
        grupo: Number(file.grupoAsignatura),
        consecutivo: null,
      });

      await this.usuarioAsignaturaRepository.save(usuarioAsignatura);
      console.log('Nuevo registro creado:', usuarioAsignatura);

    }
    return { message: 'Data processed successfully' };
  }

  @Get('StudentSemester')
  async getStudents(): Promise<Usuario[]> {
    return this.usuarioService.getStudents();
  }

  @Get('GetAsesor')
  async getAsesores(): Promise<Usuario[]> {
    return this.usuarioService.getAsesores();
  }

  @Get()
  async findAll(): Promise<any[]> {
    const usuarios = await this.usuarioService.findAll();
    return usuarios.map(usuario => ({
      id: usuario.id,
      nombre: usuario.nombre,
      documento: usuario.documento,
      correo: usuario.correo,
      semestre: usuario.semestre,
      rol: usuario.rol ? usuario.rol.id : null,
      programa: usuario.programa ? usuario.programa.id : null,
    }));
  }

  @Get('/asesor/')
  findAsesor() {
    return this.usuarioService.findAsesor();
  }

  @Get('/correos/:correo')
  findCorreo(@Param('correo') correo: string) {
    return this.usuarioService.findCorreo(correo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put('updateUsers')
  async updateUsers(@Body() payload: UpdateUsuarioDTO[]) {
    await this.usuarioService.updateUsers(payload);
    return { message: 'Usuarios actualizados correctamente' };
  }

  @Post('add')
  async createNewUsersByAsesor(@Body() payload: CreateUsuariosByAsesorDTO[]) {
    await this.usuarioService.createNewUsersByAsesor(payload);
    return { message: 'Usuarios actualizados correctamente' };
  }

}
