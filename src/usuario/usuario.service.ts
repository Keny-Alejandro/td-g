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

          await Promise.all(
            correosExistentes.map(async (usuario) => {
              const dato = payload.datos.find((d) => d.correo === usuario.correo);
              if (dato) {
                const programa: Programa = await this.programaRepository.findOne({
                  where: { id: programaId },
                });
                usuario.programa = programa;
                usuario.semestre = semestreAsignatura; // Establecer el semestre del usuario
                await this.usuarioRepository.save(usuario);
              }
            }),
          );

          await Promise.all(
            correosNuevos.map(async (dato) => {
              const programaId = await this.obtenerProgramaId(payload.codigo);
              const programa = await this.programaRepository.findOne({
                where: { id: programaId },
              });
              const rol = await this.obtenerRolParaNuevoUsuario();

              const usuarioNuevo = new Usuario();
              usuarioNuevo.rol = rol;
              usuarioNuevo.nombre = dato.nombre;
              usuarioNuevo.documento = dato.documento;
              usuarioNuevo.correo = dato.correo;
              usuarioNuevo.programa = programa;
              usuarioNuevo.semestre = semestreAsignatura;

              await this.usuarioRepository.insert(usuarioNuevo);
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

      // Realizar operaciones adicionales según el valor del código
      if (correo.codigos && correo.codigos.length > 0) {
        const codigos = correo.codigos; // Obtener los códigos del correo

        // Para cada código en los codigos
        for (const codigo of codigos) {
          // Encontrar la asignatura correspondiente al código
          const asignatura = await this.asignaturaRepository.findOne({
            where: { codigoAsignatura: codigo }
          });

          if (!asignatura) {
            throw new NotFoundException(`Asignatura no encontrada para el código ${codigo}`);
          }

          // Obtener el semestre de la asignatura
          const semestre = asignatura.semestre;

          // Verificar si ya existe una entrada en Usuario_Asignatura para este usuario y semestre
          const existeRegistro = await this.usuarioAsignaturaRepository.findOne({
            where: { usuarioasignatura: usuario, semestre }
          });

          if (!existeRegistro) {
            // Si no existe, crear una nueva entrada en Usuario_Asignatura
            await this.usuarioAsignaturaRepository.save({
              usuarioasignatura: usuario,
              semestre: semestre
            });
          }
        }
      } else {
        // Si no hay códigos, borrar todos los registros de Usuario_Asignatura para ese Usuario
        await this.usuarioAsignaturaRepository
          .createQueryBuilder()
          .delete()
          .from('Usuario_Asignatura')
          .where('usuarioasignatura.id = :usuarioId', { usuarioId: usuario.id })
          .execute();
      }
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository
      .createQueryBuilder('u')
      .select([
        'u.Usuario_Nombre',
        'u.Usuario_Documento',
        'u.Usuario_Correo',
        'u.Usuario_Semestre',
        'p.Programa_Nombre',
      ])
      .innerJoin('Programa', 'p', 'p.Programa_ID = u.Programa_ID')
      .where('u.Rol_ID = 1')
      .getMany();
  }
}
