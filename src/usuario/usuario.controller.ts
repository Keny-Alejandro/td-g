/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Patch,
  NotFoundException,
  Post
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { EmailDTO } from './dto/email.dto';
import { CargaDatosDTO } from './dto/carga-datos.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Patch('Auth')
  async findEmail(@Body() payload: EmailDTO) {
    const usuarios = await this.usuarioService.findEmail(payload);
    
    if (usuarios.length === 0) {
      throw new NotFoundException(`El correo ${payload.email} no se encuentra registrado`);
    }
  
    return usuarios;
  }  

  @Post('LoadStudents')
  async cargaDatos(@Body() payload: CargaDatosDTO) {
    try {
      const result = await this.usuarioService.procesarCargaDatos(payload);
      return { success: true, message: 'Datos cargados correctamente', data: result };
    } catch (error) {
      throw new NotFoundException('Error al procesar la carga de datos');
    }
  }

  @Post('LoadSOL')
  async procesarDatos(@Body() correos: any[]): Promise<void> {
    await this.usuarioService.procesarDatos(correos);
  }

}
