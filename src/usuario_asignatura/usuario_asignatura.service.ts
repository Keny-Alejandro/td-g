/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioAsignatura } from './entities/usuario_asignatura.entity';

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
            p."Programa_Nombre"
        FROM
            "Usuario_Asignatura" ua
        INNER JOIN "Asignatura" a ON
            a."Asignatura_ID" = ua."Asignatura_Codigo"
        INNER JOIN "Programa" p ON
            p."Programa_ID" = a."Programa_ID"
        WHERE
            ua."Usuario_ID" = $1
        ORDER BY a."Asignatura_ID" ASC
    `;
            const results = await this.usuarioAsignaturaRepository.query(query, [usuarioId]);
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
