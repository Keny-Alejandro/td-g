/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioAsignatura } from './entities/usuario_asignatura.entity';
import { UpdateConsecutivoDto, UpdateGrupoDto } from './dto/usuario_asignatura.dto';

@Injectable()
export class UsuarioAsignaturaService {
    constructor(
        @InjectRepository(UsuarioAsignatura)
        private readonly usuarioAsignaturaRepository: Repository<UsuarioAsignatura>,
    ) { }

    async getGroupsDocente(usuarioId: number) {
        try {
            const query = `
        SELECT
            ua."Grupo_Codigo",
            a."Asignatura_Semestre",
            a."Asignatura_Nombre",
            p."Programa_Nombre",
            a."Asignatura_ID"
        FROM
            "Usuario_Asignatura" ua
        INNER JOIN "Asignatura" a ON
            a."Asignatura_ID" = ua."Asignatura_Codigo"
        INNER JOIN "Programa" p ON
            p."Programa_ID" = a."Programa_ID"
        WHERE
            ua."Usuario_ID" = $1
        ORDER BY a."Asignatura_ID" ASC, ua."Grupo_Codigo" ASC
    `;
            const results = await this.usuarioAsignaturaRepository.query(query, [usuarioId]);
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getConsecutivos() {
        try {
            const query = `
        SELECT
            u."Usuario_Nombre",
            u."Usuario_Documento",
            ua."Grupo_Codigo",
            a."Asignatura_Semestre",
            a."Asignatura_Nombre",
            p."Programa_Nombre",
            a."Asignatura_ID",
            ua."Consecutivo"
        FROM
            "Usuario_Asignatura" ua
        INNER JOIN "Asignatura" a ON
            a."Asignatura_ID" = ua."Asignatura_Codigo"
        INNER JOIN "Programa" p ON
            p."Programa_ID" = a."Programa_ID"
        INNER JOIN "Usuario" u ON
            u."Usuario_ID" = ua."Usuario_ID"
        WHERE
            u."Rol_ID" = 1
        ORDER BY a."Asignatura_ID" ASC, ua."Grupo_Codigo" ASC
    `;
            const results = await this.usuarioAsignaturaRepository.query(query);
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateConsecutivos(updateConsecutivoDtos: UpdateConsecutivoDto[]): Promise<void> {
        for (const dto of updateConsecutivoDtos) {
            const usuarioAsignatura = await this.usuarioAsignaturaRepository.findOne({
                where: { usuarioasignatura: { id: dto.Usuario_ID } },
                relations: ['usuarioasignatura'],
            });

            if (usuarioAsignatura) {
                usuarioAsignatura.consecutivo = dto.Consecutivo ?? null;
                await this.usuarioAsignaturaRepository.save(usuarioAsignatura);
            }
        }
    }

    async updateGrupo(updateGrupoDto: UpdateGrupoDto): Promise<string> {
        const { Usuario_ID, Grupo_Codigo } = updateGrupoDto;
        const usuarioAsignatura = await this.usuarioAsignaturaRepository.findOne({
            where: { usuarioasignatura: { id: Usuario_ID } },
            relations: ['usuarioasignatura'],
        });

        if (!usuarioAsignatura) {
            throw new NotFoundException('No hay coincidencia');
        }

        usuarioAsignatura.grupo = Grupo_Codigo;
        await this.usuarioAsignaturaRepository.save(usuarioAsignatura);

        return 'Grupo actualizado correctamente';
    }
}
