/* eslint-disable prettier/prettier */
// carga-datos.dto.ts
import { IsArray, IsString } from 'class-validator';

export class CargaDatosDTO {
  @IsString()
  codigo: string;

  @IsArray()
  datos: any[]; // Aquí puedes ajustar el tipo según la estructura de tus datos
}
