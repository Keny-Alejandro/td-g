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
import { UpdateUsuarioDTO, CreateUsuariosByAsesorDTO } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UploadStudentsDto } from './dto/upload-students.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);
  constructor(private readonly usuarioService: UsuarioService) { }

  @Patch('Auth')
  async findEmail(@Body() payload: EmailDTO) {
    const usuarios = await this.usuarioService.findEmail(payload);

    if (usuarios.length === 0) {
      throw new NotFoundException(`El correo ${payload.email} no se encuentra registrado`);
    }

    return usuarios;
  }

  @Post('LoadStudents')
  async loadStudents(@Body() uploadStudentsDto: UploadStudentsDto): Promise<any> {
    console.log('Data received:', uploadStudentsDto);
    await this.usuarioService.processUploadedFiles(uploadStudentsDto);
    return { message: 'Data processed successfully' };
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
  async findAll(): Promise<any[]> {
    const usuarios = await this.usuarioService.findAll();
    return usuarios.map(usuario => ({
      id: usuario.id,
      nombre: usuario.nombre,
      documento: usuario.documento,
      correo: usuario.correo,
      semestre: usuario.semestre,
      rol: usuario.rol ? usuario.rol.id : null,
      programa: usuario.programa ? usuario.programa.id : null,
    }));
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
    return { message: 'Usuarios actualizados correctamente' };
  }

  @Post('add')
  async createNewUsersByAsesor(@Body() payload: CreateUsuariosByAsesorDTO[]) {
    await this.usuarioService.createNewUsersByAsesor(payload);
    return { message: 'Usuarios actualizados correctamente' };
  }

}
