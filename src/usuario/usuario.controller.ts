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
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { EmailDTO } from './dto/email.dto';
import { Usuario } from './entities/usuario.entity';
import { UploadStudentsDto } from './dto/upload-students.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioAsignatura } from '../usuario_asignatura/entities/usuario_asignatura.entity';
import { Repository } from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { Programa } from 'src/programa/entities/programa.entity';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);
  constructor(
    private readonly usuarioService: UsuarioService,
    @InjectRepository(UsuarioAsignatura)
    private readonly usuarioAsignaturaRepository: Repository<UsuarioAsignatura>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
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

      // Buscar o crear el profesor
      const Usuario_ID_Profesor = await this.usuarioService.findOrCreateProfesor(file, id_programa);

      const usuario = await this.usuarioService.findOne(Usuario_ID_Profesor);

      const existingUsuarioAsignatura = await this.usuarioAsignaturaRepository.findOne({
        where: {
          usuarioasignatura: usuario,
          semestre: id_asignatura,
          grupo: Number(file.grupoAsignatura),
        },
      });

      if (!existingUsuarioAsignatura) {
        // Si no existe, crear un nuevo registro
        const usuarioAsignatura = this.usuarioAsignaturaRepository.create({
          usuarioasignatura: usuario,
          semestre: id_asignatura,
          grupo: Number(file.grupoAsignatura),
          consecutivo: null,
        });

        await this.usuarioAsignaturaRepository.save(usuarioAsignatura);
      } else {
        console.log('El registro ya existe, no se realizará ninguna acción');
      }

      for (const student of file.students) {
        // Buscar o crear el estudiante
        const estudianteRol = await this.rolRepository.findOne({ where: { id: 1 } });
        let estudiante = await this.usuarioService.findOneByDocumento(student.documento);
        const programa = await this.programaRepository.findOne({ where: { id: id_programa } });
        if (!estudiante) {
          estudiante = this.usuarioRepository.create({
            rol: estudianteRol,
            nombre: student.nombre,
            documento: student.documento,
            correo: student.correo,
            semestre: semestre_asignatura,
            programa: programa
          });
          await this.usuarioRepository.save(estudiante);
          // Asociar el estudiante con la asignatura y el grupo
          const estudianteAsignatura = this.usuarioAsignaturaRepository.create({
            usuarioasignatura: estudiante,
            semestre: id_asignatura,
            grupo: Number(file.grupoAsignatura),
            consecutivo: null,
          });

          await this.usuarioAsignaturaRepository.save(estudianteAsignatura);
        } else {

          // Verificar si existe la asociación estudiante-asignatura-grupo
          const existingEstudianteAsignatura = await this.usuarioAsignaturaRepository.findOne({
            where: {
              usuarioasignatura: estudiante,
              semestre: id_asignatura,
            },
          });

          if (existingEstudianteAsignatura) {
            // Actualizar el registro existente
            existingEstudianteAsignatura.consecutivo = null; // O cualquier otra propiedad que necesites actualizar
            existingEstudianteAsignatura.grupo = Number(file.grupoAsignatura);
            await this.usuarioAsignaturaRepository.save(existingEstudianteAsignatura);
          }
        }

      }

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

  @Post()
  createOrUpdateUsuarios(@Body() usuariosData: any[]) {
    return this.usuarioService.createOrUpdateAsesores(usuariosData);
  }

}
