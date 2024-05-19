/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Patch,
  NotFoundException,
  Get,
  Post,
  Param,
  Logger,
  Put
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { EmailDTO } from './dto/email.dto';
import { CargaDatosDTO } from './dto/carga-datos.dto';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);
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
      const result = await this.usuarioService.procesarCargaDatos([payload]);
      return { success: true, message: 'Datos cargados correctamente', data: result };
    } catch (error) {
      throw new NotFoundException('Error al procesar la carga de datos');
    }
  }

  @Get('StudentSemester')
  async getStudents(): Promise<Usuario[]> {
    return this.usuarioService.getStudents();
  }

  @Get('GetAsesor')
  async getAsesores(): Promise<Usuario[]> {
    return this.usuarioService.getAsesores();
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
   
  @Get('/asesor/')
  findAsesor() {
    return this.usuarioService.findAsesor();
  }

  @Get('/correos/:correo') 
  findCorreo(@Param('correo') correo: string) {
    return this.usuarioService.findCorreo(correo);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put('updateUsers')
  async updateUsers(@Body() payload: UpdateUsuarioDTO[]) {
    await this.usuarioService.updateUsers(payload);
    return { success: true, message: 'Usuarios actualizados correctamente' };
  }

}
