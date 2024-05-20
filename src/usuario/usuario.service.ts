/* eslint-disable prettier/prettier */
import { UploadStudentsDto } from './dto/upload-students.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { EmailDTO } from './dto/email.dto';
import { Rol } from 'src/rol/entities/rol.entity';
import { UsuarioAsignatura } from 'src/usuario_asignatura/entities/usuario_asignatura.entity';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(UsuarioAsignatura)
    private readonly usuarioAsignaturaRepository: Repository<UsuarioAsignatura>
  ) { }

  async findEmail(EmailDTO: EmailDTO): Promise<Usuario[]> {
    const query =
      'select u."Usuario_ID", u."Usuario_Nombre",u."Usuario_Documento",u."Usuario_Correo",p."Programa_ID",p."Programa_Nombre",r."Rol_ID", r."Rol_Descripcion", eu."Codigo_Equipo" from "Usuario" u join "Rol" r on r."Rol_ID" = u."Rol_ID" join "Programa" p on p."Programa_ID" = u."Programa_ID" join "Equipo_Usuario" eu on eu."Usuario_ID" = u."Usuario_ID" where u."Usuario_Correo" = $1';
    const usuarios = await this.usuarioRepository.query(query, [
      EmailDTO.email,
    ]);

    if (usuarios.length === 0) {
      throw new NotFoundException(
        `El correo ${EmailDTO.email} no se encuentra registrado, si considera que es un error, por favor comuníquese con el Coordinador lo más pronto posible.`,
      );
    }

    return usuarios;
  }

  async findAsignaturaByCodigo(codigo: string): Promise<Asignatura> {
    return await this.asignaturaRepository.findOne({ where: { codigoAsignatura: codigo } });
  }

  async processUploadedFiles(uploadStudentsDto: UploadStudentsDto): Promise<void> {
    const { files } = uploadStudentsDto;

    // Aquí puedes procesar cada archivo y sus estudiantes
    files.forEach(file => {
      console.log('Processing file:', file.codigo);
      console.log('Profesor:', file.nombreProfesor, file.documentoProfesor, file.correoProfesor);

      file.students.forEach(student => {
        console.log('Student:', student.documento, student.nombre, student.correo);
        // Aquí puedes guardar los datos del estudiante en la base de datos
      });
    });

    // Lógica adicional para procesar los datos
  }

  async getStudents() {
    const query = `
    select
	"Usuario"."Usuario_ID",
	"Usuario"."Usuario_Nombre",
	"Asignatura"."Asignatura_Nombre",
	"Usuario_Asignatura"."Grupo_Codigo",
  "Asignatura"."Asignatura_Semestre",
  "Usuario"."Usuario_Documento"
from
	"Usuario" "Usuario"
inner join "Usuario_Asignatura" on
	"Usuario_Asignatura"."Usuario_ID" = "Usuario"."Usuario_ID" 
inner join "Asignatura" on
	"Asignatura"."Asignatura_ID" = "Usuario_Asignatura"."Asignatura_Codigo" 
where
	"Usuario"."Rol_ID" = 1
order by "Usuario_Asignatura"."Grupo_Codigo" asc, "Usuario"."Usuario_Nombre" asc  
    `;
    const results = await this.usuarioAsignaturaRepository.query(query);
    return results;
  }

  async getAsesores(): Promise<any[]> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .select([
        'usuario.Usuario_ID',
        'usuario.Usuario_Nombre',
        'usuario.Rol_ID',
        'usuario.Usuario_Documento',
        'usuario.Usuario_Correo'
      ])
      .where('usuario.Rol_ID = :rolId1 OR usuario.Rol_ID = :rolId2', { rolId1: 3, rolId2: 5 })
      .orderBy('usuario.Usuario_Nombre', 'ASC')
      .getRawMany();
  }

  async findAsesor() {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .where('rol.id = 3' || 'rol.id = 5')
      .getMany();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['rol', 'programa'] });
  }

  async Login(Correo: string) {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .where('usuario.correo = :correo', { correo: Correo })
      .getOne()
  }
  async findOne(id: number) {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .where('usuario.id = :id', { id: id })
      .getOne();
  }

  async findCorreo(correo: string) {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rol', 'Rol')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .leftJoinAndSelect('usuario.usuario', 'EquipoUsuario')
      .where('usuario.correo = :correo', { correo: correo })
      .getOne();
  }

  async updateUsers(payloads: UpdateUsuarioDTO[]): Promise<void> {
    await Promise.all(payloads.map(async (payload) => {
      const usuario = await this.usuarioRepository.findOne({ where: { documento: payload.Usuario_Documento } });

      if (usuario) {
        const rol = await this.rolRepository.findOne({ where: { id: payload.Rol_ID } });
        if (!rol) {
          throw new NotFoundException(`Rol con ID ${payload.Rol_ID} no encontrado`);
        }

        await this.usuarioRepository.update(payload.Usuario_ID, {
          nombre: payload.Usuario_Nombre,
          documento: payload.Usuario_Documento,
          correo: payload.Usuario_Correo,
          rol: rol
        });
      }
    }));
  }

  async createNewUsersByAsesor(payload: any): Promise<void> {
    const rol = await this.rolRepository.findOne({ where: { id: payload.rol.id } });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${payload.rol.id} no encontrado`);
    }

    await Promise.all(payload.map(async (usuario) => {
      await this.usuarioRepository.save({
        nombre: usuario.Usuario_Nombre,
        documento: usuario.Usuario_Documento,
        correo: usuario.Usuario_Correo,
        rol: rol
      });
    }));
    
  }
}
