/* eslint-disable prettier/prettier */
// src/dto/upload-students.dto.ts

import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StudentDto {
  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  correo: string;
}

class FileDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  documentoProfesor: string;

  @IsString()
  @IsNotEmpty()
  grupoAsignatura: string;

  @IsString()
  @IsNotEmpty()
  correoProfesor: string;

  @IsString()
  @IsNotEmpty()
  nombreProfesor: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students: StudentDto[];
}

export class UploadStudentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
