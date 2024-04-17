/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail } from 'class-validator';
//import { Transform } from 'class-transformer';

export class EmailDTO {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El formato del correo electrónico es inválido' })
  //@Transform(({ value }) => value.toLowerCase())
  //@Matches(/@elpoli\.edu\.co$/, { message: 'El correo no pertenece al dominio del PJIC' })
  email: string;
}
