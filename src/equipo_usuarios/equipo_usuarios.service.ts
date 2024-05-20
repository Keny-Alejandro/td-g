/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoUsuario } from './entities/equipo_usuario.entity';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';

@Injectable()
export class EquipoUsuariosService {
  constructor(
    @InjectRepository(EquipoUsuario)
    private equipoUsuarioRepository: Repository<EquipoUsuario>,
    @InjectRepository(EquipoPpi)
    private readonly repositoryBitacora: Repository<EquipoPpi>,
    @InjectRepository(EquipoPpiPjic)
    private readonly repositoryEquipoPJIC: Repository<EquipoPpiPjic>
  ) { }

  async procesarGrupos(grupos: any[]) {
    for (const grupo of grupos) {
      const codigoEquipo = parseInt(grupo.Codigo_Equipo);
      const usuariosId = grupo.Usuario_ID;

      for (const usuarioId of usuariosId) {
        const usuarioExiste = await this.existeUsuario(usuarioId);
        if (!usuarioExiste) {
          const equipoUsuario = new EquipoUsuario();
          equipoUsuario.codigoEquipo = codigoEquipo;
          equipoUsuario.usuarioId = usuarioId;
          await this.equipoUsuarioRepository.save(equipoUsuario);
        }
      }
    }
  }

  async existeUsuario(usuarioId: number): Promise<boolean> {
    const usuario = await this.equipoUsuarioRepository.findOne({
      where: { usuarioId },
    });
    return !!usuario;
  }

  async obtenerGruposPorPrimerDigito(firstDigit: string): Promise<any[]> {
    const query = `
      SELECT
        eu."Codigo_Equipo",
        u."Usuario_Nombre"
      FROM
        "Equipo_Usuario" eu
      JOIN
        "Usuario" u ON
        u."Usuario_ID" = eu."Usuario_ID"
      WHERE
        SUBSTRING(CAST(eu."Codigo_Equipo" AS TEXT) FROM 1 FOR 1) = $1
      ORDER BY
        eu."Codigo_Equipo" ASC;
    `;
    const result = await this.equipoUsuarioRepository.query(query, [firstDigit]);
    return result;
  }

  async findAll(): Promise<EquipoUsuario[]> {
    return this.equipoUsuarioRepository.query(`
      SELECT
          eu."Codigo_Equipo",
          u."Usuario_Nombre",
          ua."Grupo_Codigo",
          a."Asignatura_Nombre",
          a."Asignatura_Semestre",
          eu."Nota_Asesoria_Definitiva_Individual",
          u."Usuario_ID"
      FROM
          "Equipo_Usuario" eu
      JOIN
          "Usuario" u ON
          u."Usuario_ID" = eu."Usuario_ID"
      JOIN "Usuario_Asignatura" ua ON
          ua."Usuario_ID" = eu."Usuario_ID"
      JOIN "Asignatura" a ON
          a."Asignatura_ID" = ua."Asignatura_Codigo"
      ORDER BY
          eu."Codigo_Equipo" ASC;
    `);
  }

  async obtenerGrupoIndividual(id: number): Promise<any[]> {
    const query = `
      SELECT
        eu."Codigo_Equipo",
        u."Usuario_Nombre",
        eu."Nota_Asesoria_Definitiva_Individual"
      FROM
        "Equipo_Usuario" eu
      JOIN
        "Usuario" u ON
        u."Usuario_ID" = eu."Usuario_ID"
      WHERE
        eu."Usuario_ID" = $1
      ORDER BY
        eu."Codigo_Equipo" ASC;
    `;
    const result = await this.equipoUsuarioRepository.query(query, [id]);
    return result;
  }

  async actualizarNotas(notas: any[]): Promise<any> {
    try {
      await Promise.all(
        notas.map(async nota => {
          const { Codigo_Equipo, Nota_Asesoria_Definitiva_Individual, Usuario_ID } = nota;
          await this.equipoUsuarioRepository.update(
            { usuarioId: Usuario_ID, codigoEquipo: Codigo_Equipo }, // Filtro basado en usuarioId y codigoEquipo
            { notadefinitivaind: Nota_Asesoria_Definitiva_Individual } // Valores a actualizar
          );
        })
      );
      return { success: true, message: 'Notas actualizadas correctamente' };
    } catch (error) {
      console.error('Error al actualizar las notas:', error);
      return { success: false, message: 'Error al actualizar las notas' };
    }
  }

  async findBitacoraByEstudiante(Correo: string) {
    const EquipoUsuario = await this.equipoUsuarioRepository
      .createQueryBuilder("equipoUsuario")
      .leftJoinAndSelect("equipoUsuario.usuario", "usuario")
      .where('usuario.correo = :correo', { correo: Correo })
      .getOne();

    if (EquipoUsuario) {
      const Bitacora = await this.repositoryBitacora
        .createQueryBuilder("equipoPpi")
        .where('equipoPpi.codigoEquipo = :cod', { cod: EquipoUsuario.codigoEquipo })
        .getOne();
      return Bitacora;
    }
    return null;
  }

  async findEstudiante() {
    const resultados = await this.equipoUsuarioRepository
      .createQueryBuilder('equipoUsuario')
      .leftJoinAndSelect('equipoUsuario.usuario', 'usuario')
      .getMany();
    const resultadosAgrupados = {};
    resultados.forEach((resultado) => {
      const key = resultado.codigoEquipo;
      if (!resultadosAgrupados[key]) {
        resultadosAgrupados[key] = [];
      }
      resultadosAgrupados[key].push(resultado.usuario);
    });

    return resultadosAgrupados;
  }


  async findEstudianteBitacora() {
    const resultados = await this.equipoUsuarioRepository
      .createQueryBuilder('equipoUsuario')
      .leftJoinAndSelect('equipoUsuario.usuario', 'usuario')
      .getMany();
    const resultadosAgrupados: Record<string, { usuarios: any[], bitacora: any[], moduloSol: any[] }> = {};
    for (const resultado of resultados) {
      const key = resultado.codigoEquipo;
      if (!resultadosAgrupados[key]) {
        resultadosAgrupados[key] = { usuarios: [], bitacora: [], moduloSol: [] };
      }
      resultadosAgrupados[key].usuarios.push(resultado.usuario);
    }
    for (const [key, value] of Object.entries(resultadosAgrupados)) {
      const bitacora = await this.repositoryBitacora
        .createQueryBuilder('equipoPpi')
        .where('equipoPpi.codigoEquipo = :id', { id: key })
        .getOne();
      console.log(key)
      const modSol = await this.repositoryEquipoPJIC
        .createQueryBuilder('EquipoPpiPjic')
        .leftJoinAndSelect('EquipoPpiPjic.usuariopjic', 'usuario')
        .where('EquipoPpiPjic.codigoEquipo = :id', { id: key })
        .getOne();
      value.moduloSol.push(modSol.usuariopjic);
      if (bitacora != null) {
        value.bitacora.push(bitacora);
      }
    }
    return resultadosAgrupados;
  }

  async findEstudianteBitacoraModSol(id: string) {
    const resultados = await this.repositoryEquipoPJIC
      .createQueryBuilder('EquipoPpiPjic')
      .where('EquipoPpiPjic.usuariopjic = :id', { id: id })
      .getMany();
    return resultados;
  }

}
