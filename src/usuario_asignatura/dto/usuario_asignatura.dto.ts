/* eslint-disable prettier/prettier */
export class UpdateConsecutivoDto {
  Usuario_ID: number;
  Consecutivo: number | null;
}

export class UpdateGrupoDto {
  Usuario_ID: number;
  Grupo_Codigo: number;
}

export class CreateUsuarioAsignaturaDto {
  id: number;
  Asignatura_Semestre: number;
  Grupo_Codigo: number;
}