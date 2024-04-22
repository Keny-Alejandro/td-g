/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class EmailDTO {
  @IsNotEmpty({ message: 'El Correo Electrónico es obligatorio' })
  @IsEmail({}, { message: 'El formato del correo electrónico es inválido' })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(/@elpoli\.edu\.co$/, { message: 'La cuenta de correo con la que intenta acceder no pertenece al dominio del Politécnico Colombiano Jaime Isaza Cadavid.' })
  email: string;
}
