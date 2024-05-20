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
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailDTO } from './dto/email.dto';
import * as mimeTypes from 'mime-types';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
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
  @UseInterceptors(FileInterceptor('file'))
  async procesarArchivo(@UploadedFile() file: Express.Multer.File) {
    const mimeType = mimeTypes.lookup(file.originalname);
    if (!mimeType || !mimeType.includes('excel')) {
      throw new BadRequestException('El archivo debe ser un Excel');
    }

    // Procesar el archivo
    const fileData = JSON.parse(file.buffer.toString('utf-8'));
    await this.usuarioService.procesarArchivo(fileData);
    return { message: 'Archivo procesado correctamente' };
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

}
