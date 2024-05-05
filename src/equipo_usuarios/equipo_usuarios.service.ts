/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoUsuario } from './entities/equipo_usuario.entity';

@Injectable()
export class EquipoUsuariosService {
  constructor(
    @InjectRepository(EquipoUsuario)
    private equipoUsuarioRepository: Repository<EquipoUsuario>,
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
}
