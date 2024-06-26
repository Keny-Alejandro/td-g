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
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';

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
    @InjectRepository(HoraSemanal)
    private readonly horasemanalRepository: Repository<HoraSemanal>,
    @InjectRepository(UsuarioAsignatura)
    private readonly usuarioAsignaturaRepository: Repository<UsuarioAsignatura>
  ) { }

  async createOrUpdateAsesores(usuariosData: any[]): Promise<any[]> {
    const promises = usuariosData.map(async (usuarioData) => {
      const usuario = await this.usuarioRepository.findOne({
        where: { documento: usuarioData.Usuario_Documento },
      });

      const profesorRol = await this.rolRepository.findOne({ where: { id: usuarioData.Rol_ID } })

      if (usuario) {
        // Si el usuario ya existe, actualiza sus datos
        usuario.nombre = usuarioData.Usuario_Nombre;
        usuario.correo = usuarioData.Usuario_Correo;
        usuario.rol = profesorRol; // Aquí debes asignar correctamente el objeto Rol, no solo el ID
        const HorasSeman= await this.horasemanalRepository
        .createQueryBuilder('horaSemanal') 
        .where('horaSemanal.id = :id', { id:usuarioData.id_hora })
        .getOne(); 
        HorasSeman.horasAsignadas=usuarioData.Horas_Asesor
        HorasSeman.salon=usuarioData.Oficina  
        this.horasemanalRepository.save(HorasSeman)
        return this.usuarioRepository.save(usuario);
      } else {
        // Si el usuario no existe, crea uno nuevo
        const nuevoUsuario = this.usuarioRepository.create({
          nombre: usuarioData.Usuario_Nombre,
          correo: usuarioData.Usuario_Correo,
          documento: usuarioData.Usuario_Documento,
          rol: profesorRol
        });
        console.log(usuarioData)
        const retorno= await this.usuarioRepository.save(nuevoUsuario); 
        const nuevaHoraAsesoria= this.horasemanalRepository.create({
          horasAsignadas:usuarioData.Horas_Asesor,
          salon: usuarioData.Oficina,
          hora:retorno,
          horasPendientes:[]
        })
         console.log(nuevaHoraAsesoria)
        this.horasemanalRepository.save(nuevaHoraAsesoria);
        return retorno
      }
    });

    return Promise.all(promises);
  }

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

  async findOrCreateProfesor(file: any, programaId: number): Promise<number> {
    let profesor = await this.usuarioRepository.findOne({ where: { documento: file.documentoProfesor } });

    if (!profesor) {

      const profesorRol = await this.rolRepository.findOne({ where: { id: 2 } }); // Aquí asumo que el ID del rol de profesor es 2, asegúrate de que coincida con tu lógica de negocio

      const programa = await this.programaRepository.findOne({ where: { id: programaId } }); // Aquí asumo que programaId es el ID del programa que recibes como parámetro

      profesor = this.usuarioRepository.create({
        rol: profesorRol,
        nombre: file.nombreProfesor,
        documento: file.documentoProfesor,
        correo: file.correoProfesor,
        programa: programa,
        semestre: null,
      });
      await this.usuarioRepository.save(profesor);
    }

    return profesor.id;
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
    const asesores= await this.usuarioRepository
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
 
     for (let index = 0; index < asesores.length; index++) {
       const element = asesores[index];
       const horaS= await this.horasemanalRepository
       .createQueryBuilder('horaSemanal')
       .innerJoinAndSelect('horaSemanal.hora', 'usuario')
       .where('usuario.id = :id', { id:element.Usuario_ID })
       .getOne();
       if(horaS!=null){
       element["Horas_Asesor"]=horaS.horasAsignadas
       element["Oficina"]=horaS.salon
       element["id_hora"]=horaS.id
       }else{ 
       element["Horas_Asesor"]=""
       element["Oficina"]=""
       }
     }
 

     return asesores;
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

  async findOneByDocumento(documento: string) {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .where('usuario.documento = :documento', { documento: documento })
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

}
