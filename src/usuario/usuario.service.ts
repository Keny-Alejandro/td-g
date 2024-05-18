/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { EmailDTO } from './dto/email.dto';
import { CargaDatosDTO } from './dto/carga-datos.dto';
import { Rol } from 'src/rol/entities/rol.entity';
import { UsuarioAsignatura } from 'src/usuario_asignatura/entities/usuario_asignatura.entity';

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

  async obtenerRolParaNuevoUsuario(): Promise<Rol> {
    const rolId = 1;
    const rol = await this.rolRepository.findOne({ where: { id: rolId } });
    if (!rol) {
      throw new Error(`No se pudo encontrar el rol con ID ${rolId}`);
    }
    return rol;
  }

  async procesarCargaDatos(payloads: CargaDatosDTO[]): Promise<any> {
    try {
      const resultados = await Promise.all(
        payloads.map(async payload => {
          const programaId = await this.obtenerProgramaId(payload.codigo);
          if (!programaId) {
            throw new NotFoundException('ASIGNATURA NO ENCONTRADA');
          }

          const asignatura = await this.asignaturaRepository.findOne({
            where: { codigoAsignatura: payload.codigo },
          });

          if (!asignatura) {
            throw new NotFoundException('ASIGNATURA NO ENCONTRADA');
          }

          const semestreAsignatura = asignatura.semestre;

          const correosExistentes = await this.usuarioRepository.find({
            where: { correo: In(payload.datos.map((d) => d.correo)) },
          });

          const correosEnDB = correosExistentes.map((u) => u.correo);
          const correosNuevos = payload.datos.filter(
            (d) => !correosEnDB.includes(d.correo),
          );

          await this.actualizarProfesor(payload.codigo, payload.grupoAsignatura, payload.documentoProfesor);

          await Promise.all(
            correosExistentes.map(async (usuario) => {
              const dato = payload.datos.find((d) => d.correo === usuario.correo);
              if (dato) {
                const programa: Programa = await this.programaRepository.findOne({
                  where: { id: programaId },
                });
                usuario.programa = programa;
                usuario.semestre = semestreAsignatura;
                await this.usuarioRepository.save(usuario);
                await this.actualizarUsuarioAsignatura(usuario.id, payload.codigo, payload.grupoAsignatura);
              }
            }),
          );

          await Promise.all(
            correosNuevos.map(async (dato) => {
              const rol = await this.obtenerRolParaNuevoUsuario();
              const programa = await this.programaRepository.findOne({
                where: { id: programaId },
              });

              const usuarioNuevo = new Usuario();
              usuarioNuevo.rol = rol;
              usuarioNuevo.nombre = dato.nombre;
              usuarioNuevo.documento = dato.documento;
              usuarioNuevo.correo = dato.correo;
              usuarioNuevo.programa = programa;
              usuarioNuevo.semestre = semestreAsignatura;

              const usuarioGuardado = await this.usuarioRepository.save(usuarioNuevo);
              await this.insertarUsuarioAsignatura(usuarioGuardado.id, payload.codigo, payload.grupoAsignatura);
            }),
          );

          return { success: true, message: 'Datos procesados correctamente' };
        })
      );

      return resultados;
    } catch (error) {
      throw new Error(
        'Error al procesar la carga de datos en la base de datos',
      );
    }
  }

  async actualizarUsuarioAsignatura(usuarioId: number, codigoAsignatura: string, grupoCodigo: number): Promise<void> {
    // Obtener el ID de la asignatura a partir del código
    const asignatura = await this.asignaturaRepository.findOne({
      where: { codigoAsignatura: codigoAsignatura },
    });

    if (!asignatura) {
      throw new NotFoundException('Asignatura no encontrada para el código proporcionado');
    }

    const asignaturaId = asignatura.id;

    // Para estudiantes: Buscar la entrada existente en Usuario_Asignatura
    const usuarioAsignaturaExistente = await this.usuarioAsignaturaRepository.findOne({
      where: { usuarioasignatura: { id: usuarioId } }
    });

    if (usuarioAsignaturaExistente) {
      // Actualizar el valor de grupoCodigo
      usuarioAsignaturaExistente.grupo = grupoCodigo;
      usuarioAsignaturaExistente.semestre = asignaturaId;
      await this.usuarioAsignaturaRepository.save(usuarioAsignaturaExistente);
    } else {
      throw new Error('No se encontró la entrada de Usuario_Asignatura para actualizar.');
    }
  }

  async actualizarProfesor(codigoAsignatura: string, grupoCodigo: number, documentoProfesor: number): Promise<void> {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { codigoAsignatura: codigoAsignatura },
    });

    if (!asignatura) {
      throw new NotFoundException('Asignatura no encontrada para el código proporcionado');
    }

    const asignaturaId = asignatura.id;

    const profesor = await this.usuarioRepository.findOne({
      where: { documento: documentoProfesor.toString() }
    });

    if (!profesor) {
      throw new NotFoundException('Usuario no encontrado para el ID proporcionado');
    }

    const profesorExistente = await this.usuarioAsignaturaRepository.findOne({
      where: {
        usuarioasignatura: profesor,
        semestre: asignaturaId
      }
    });

    if (profesorExistente) {
      profesorExistente.grupo = grupoCodigo;
      await this.usuarioAsignaturaRepository.save(profesorExistente);
    }
  }

  async insertarUsuarioAsignatura(usuarioId: number, codigoAsignatura: string, grupoCodigo: number): Promise<void> {
    // Obtener el ID de la asignatura a partir del código
    const asignatura = await this.asignaturaRepository.findOne({
      where: { codigoAsignatura: codigoAsignatura },
    });

    if (!asignatura) {
      throw new NotFoundException('Asignatura no encontrada para el código proporcionado');
    }

    const asignaturaId = asignatura.id;

    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId }
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado para el ID proporcionado');
    }

    // Crear una nueva entrada en Usuario_Asignatura
    const nuevaAsignaturaUsuario = new UsuarioAsignatura();
    nuevaAsignaturaUsuario.usuarioasignatura = usuario;
    nuevaAsignaturaUsuario.semestre = asignaturaId;
    nuevaAsignaturaUsuario.grupo = grupoCodigo;
    await this.usuarioAsignaturaRepository.insert(nuevaAsignaturaUsuario);
  }

  async obtenerProgramaId(codigo: string): Promise<number | undefined> {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { codigoAsignatura: codigo },
    });
    return asignatura ? asignatura.programaId : undefined;
  }

  async procesarDatos(correos: any[]): Promise<void> {
    const roles = {
      Docente: 2,
      Asesor: 3,
      Mixto: 5,
    };

    const programas = {
      Técnica: 1,
      Tecnología: 2,
      Múltiple: 3,
    };

    // Crear usuarios para todos los correos
    const usuariosPromises = correos.map(async (correo) => {
      const usuarioExistente = await this.usuarioRepository.findOne({
        where: { correo: correo.correo },
      });

      if (usuarioExistente) {
        usuarioExistente.rol = roles[correo.rol];
        usuarioExistente.programa = programas[correo.programa];
        await this.usuarioRepository.save(usuarioExistente);
        return usuarioExistente;
      } else {
        const nuevoUsuario = this.usuarioRepository.create({
          nombre: correo.nombre,
          correo: correo.correo,
          documento: correo.documento,
          rol: { id: roles[correo.rol] },
          programa: { id: programas[correo.programa] },
        });
        return this.usuarioRepository.save(nuevoUsuario);
      }
    });

    const usuarios = await Promise.all(usuariosPromises);

    // Procesar asignaturas para todos los usuarios
    for (let i = 0; i < correos.length; i++) {
      const correo = correos[i];
      const usuario = usuarios[i];

      if (correo.codigos && correo.codigos.length > 0) {
        const codigos = correo.codigos;

        // Para cada código en los códigos
        for (const codigo of codigos) {
          // Encontrar la asignatura correspondiente al código
          const asignatura = await this.asignaturaRepository.findOne({
            where: { codigoAsignatura: codigo }
          });

          if (!asignatura) {
            throw new NotFoundException(`Asignatura no encontrada para el código ${codigo}`);
          }

          // Verificar si ya existe una entrada para este usuario y esta asignatura
          const existeRegistro = await this.usuarioAsignaturaRepository.findOne({
            where: {
              usuarioasignatura: usuario,
              semestre: asignatura.id // Asignatura_ID
            }
          });

          // Si no existe, crear una nueva entrada en Usuario_Asignatura
          if (!existeRegistro) {
            const usuarioAsignatura = new UsuarioAsignatura();
            usuarioAsignatura.usuarioasignatura = usuario;
            usuarioAsignatura.semestre = asignatura.id; // Asignatura_ID
            usuarioAsignatura.grupo = 0; // Establecer el valor del grupo

            await this.usuarioAsignaturaRepository.save(usuarioAsignatura);
          }
        }
      }
    }

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
        'usuario.Usuario_Nombre'
      ])
      .where('usuario.Rol_ID = :rolId1 OR usuario.Rol_ID = :rolId2', { rolId1: 3, rolId2: 5 })
      .orderBy('usuario.Usuario_Nombre', 'ASC')
      .getRawMany();
  }

  async findAsesor() {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .where('rol.id = 3')
      .getMany();
  }
 
  async findAll() {
    return this.usuarioRepository.find();
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


}
