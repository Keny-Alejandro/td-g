/* eslint-disable prettier/prettier */
// carga-datos.dto.ts
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CargaDatosDTO {
  @IsString()
  codigo: string;

  @IsNumber()
  grupoAsignatura: number;

  @IsString()
  documentoProfesor: string;

  @IsArray()
  datos: any[]; // Aquí puedes ajustar el tipo según la estructura de tus datos

  @IsString()
  correoProfesor: string;

  @IsString()
  nombreProfesor: string;
}
