import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitasAsesoriaPpiService } from './citas_asesoria_ppi.service';
import { CreateCitasAsesoriaPpiDto } from './dto/create-citas_asesoria_ppi.dto';
import { UpdateCitasAsesoriaPpiDto } from './dto/update-citas_asesoria_ppi.dto';

@Controller('citas-asesoria-ppi')
export class CitasAsesoriaPpiController {
  constructor(private readonly citasAsesoriaPpiService: CitasAsesoriaPpiService) { }

  @Post()
  create(@Body() createCitasAsesoriaPpiDto: CreateCitasAsesoriaPpiDto) {
    return this.citasAsesoriaPpiService.create(createCitasAsesoriaPpiDto);
  }

  @Get(':Fechainicio/:FechaFin/:Usuario')
  findRangeAsesor(@Param('Fechainicio') Fechainicio: string, @Param('FechaFin') FechaFin: string, @Param('Usuario') Usuario: string) {
    return this.citasAsesoriaPpiService.findRangeAsesor(Fechainicio, FechaFin, Usuario);
  }
  @Get('/asesor/:Usuario')
  findByAsesor(@Param('Usuario') Usuario: string) {
    return this.citasAsesoriaPpiService.findByAsesor(Usuario);
  }
  @Get('/Equipo/:Usuario')
  findRangeEquipo(@Param('Usuario') Usuario: string) {
    return this.citasAsesoriaPpiService.findRangeEquipo(Usuario);
  }

  @Get('/EquipoFecha/:Fechainicio/:FechaFin/:Usuario')
  findRangeEquipoFecha(@Param('Fechainicio') Fechainicio: string, @Param('FechaFin') FechaFin: string,@Param('Usuario') Usuario: string) {
    return this.citasAsesoriaPpiService.findRangeEquipoFecha(Fechainicio, FechaFin,Usuario);
  }

  @Get('/Estado/:Fechainicio/:FechaFin/:Usuario/:Estado')
  findRangeEstado(@Param('Fechainicio') Fechainicio: string, @Param('FechaFin') FechaFin: string, @Param('Usuario') Usuario: string, @Param('Estado') Estado: string) {
    return this.citasAsesoriaPpiService.findRangeEstado(Fechainicio, FechaFin,Usuario, Estado);
  }
  @Get('/Seguimiento/:id')
  findCitaBySeguimiento(@Param('id') id: number) {
    return this.citasAsesoriaPpiService.findCitaBySeguimiento(id);
  }


  @Get('/BuscarFechaHoraUsuario/:Fecha/:Hora/:Usuario')
  findFechaHora(@Param('Fecha') Fecha: string, @Param('Hora') Hora: string, @Param('Usuario') Usuario: string) {
    return this.citasAsesoriaPpiService.findFechaHora(Fecha, Hora, Usuario);
  }

  @Get()
  findAll() {
    return this.citasAsesoriaPpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasAsesoriaPpiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitasAsesoriaPpiDto: UpdateCitasAsesoriaPpiDto) {
    return this.citasAsesoriaPpiService.update(+id, updateCitasAsesoriaPpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasAsesoriaPpiService.remove(+id);
  }
}
