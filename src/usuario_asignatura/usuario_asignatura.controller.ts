/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioAsignaturaService } from './usuario_asignatura.service';
import { UpdateConsecutivoDto, UpdateGrupoDto } from './dto/usuario_asignatura.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioAsignaturaDto } from './dto/usuario_asignatura.dto';
import { UsuarioAsignatura } from './entities/usuario_asignatura.entity';

@ApiTags('usuario-asignatura')
@Controller('usuario-asignatura')
export class UsuarioAsignaturaController {
  constructor(
    private readonly usuarioAsignaturaService: UsuarioAsignaturaService,
  ) { }

  //@Get(':id')
  //findOne(@Param('id') id: string) {
    //return this.usuarioAsignaturaService.findOne(+id);
  //}

  @Get('GroupsDocente/:Usuario_ID')
  async getGroupsDocente(@Param('Usuario_ID') usuarioId: number) {
    try {
      const groupsDocente = await this.usuarioAsignaturaService.getGroupsDocente(usuarioId);
      return groupsDocente;
    } catch (error) {
      throw new NotFoundException('No se encontraron grupos para el usuario proporcionado');
    }
  }

  @Get('Consecutivos')
  async getConsecutivos() {
    try {
      const consec = await this.usuarioAsignaturaService.getConsecutivos();
      return consec;
    } catch (error) {
      throw new NotFoundException('No se encontraron consecutivos');
    }
  }

  @Put('update-consecutivos')
  async updateConsecutivos(@Body() updateConsecutivoDtos: UpdateConsecutivoDto[]): Promise<void> {
    await this.usuarioAsignaturaService.updateConsecutivos(updateConsecutivoDtos);
  }

  @Put('update-grupo')
  async updateGrupo(@Body() updateGrupoDto: UpdateGrupoDto): Promise<string> {
    try {
      return await this.usuarioAsignaturaService.updateGrupo(updateGrupoDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error.message;
      }
      throw error;
    }
  }

  @Post('createUsuarioAsignatura')
  async create(@Body() createUsuarioAsignaturaDto: CreateUsuarioAsignaturaDto[]): Promise<UsuarioAsignatura[]> {
    return this.usuarioAsignaturaService.createUsuarioAsignaturas(createUsuarioAsignaturaDto);
  }
}
