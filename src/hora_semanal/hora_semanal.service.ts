import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHoraSemanalDto } from './dto/create-hora_semanal.dto';
import { UpdateHoraSemanalDto } from './dto/update-hora_semanal.dto';
import { HoraSemanal } from './entities/hora_semanal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import * as fs from 'fs';
import { Semana } from 'src/semanas/entities/semana.entity';
import { format } from 'date-fns';

@Injectable()
export class HoraSemanalService {

  constructor(
    @InjectRepository(HoraSemanal) private readonly repository: Repository<HoraSemanal>,
    @InjectRepository(Usuario) private readonly repositoryUsuario: Repository<Usuario>,
    @InjectRepository(CitasAsesoriaPpi) private readonly repositoryCitasAsesoriaPpi: Repository<CitasAsesoriaPpi>,
    @InjectRepository(EquipoPpi) private readonly repositoryEquipoPpi: Repository<EquipoPpi>,
    @InjectRepository(Semana) private readonly repositorySemana: Repository<Semana>, @InjectRepository(EquipoUsuario) private readonly repositoryEquipoUsuario: Repository<EquipoUsuario>) {

  }

  create(createHoraSemanalDto: CreateHoraSemanalDto) {
    return 'This action adds a new horaSemanal';
  }

  async findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} horaSemanal`;
  }

  async findProfesor(id: number) {
    return this.repository
      .createQueryBuilder('horaSemanal')
      .innerJoinAndSelect('horaSemanal.hora', 'usuario')
      .where('usuario.id = :id', { id })
      .getMany();
  }

  async exportarCitasProfesor() {

    const XlsxPopulate = require('xlsx-populate');
    const libro = await XlsxPopulate.fromBlankAsync();

    const asesores = await this.repositoryUsuario
      .createQueryBuilder('Usuario')
      .innerJoinAndSelect('Usuario.rol', 'rol')
      .innerJoinAndSelect('Usuario.hora', 'HoraSemanal')
      .where('rol.id = 3')
      .getMany();

    const semanas = await this.repositorySemana.find()

    const resultados = await this.repositoryEquipoUsuario
      .createQueryBuilder('equipoUsuario')
      .leftJoinAndSelect('equipoUsuario.usuario', 'usuario')
      .getMany();
    const resultadosAgrupados = {};
    resultados.forEach((resultado) => {
      const key = resultado.codigoEquipo;
      if (!resultadosAgrupados[key]) {
        resultadosAgrupados[key] = [];
      }
      resultadosAgrupados[key].push(resultado.usuario);
    });

    for (let index = 0; index < asesores.length; index++) {
      const element = asesores[index]
      libro.addSheet(element.nombre);

      const horas = element.hora[0];
      const hoja = await libro.sheet(element.nombre)

      //Cabesera nombre correo y horas semanales
      hoja.range("A1:B1").merged(true).value([["Nombre: ", null, null, null]]);
      hoja.range("C1:H1").merged(true).value([[element.nombre, null, null, null]]);

      hoja.cell("A2").value("Horas:")
      hoja.cell("B2").value(horas.horasAsignadas)

      hoja.range("C2:D2").merged(true).value([["Correo: ", null, null, null]]);
      hoja.range("E2:H2").merged(true).value([[element.correo, null, null, null]]);

      //Citas
      hoja.cell("A3").value("Semana")
      hoja.cell("B3").value("Fecha")
      hoja.cell("C3").value("Hora")
      hoja.cell("D3").value("Link Cita")
      hoja.cell("E3").value("Estado Cita")
      hoja.cell("F3").value("Tipo Cita")
      hoja.cell("G3").value("Equipo")
      hoja.cell("H3").value("Estudiantes")


      const citas = await this.repositoryCitasAsesoriaPpi
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.equipocita', 'EquipoPpi')
        .leftJoinAndSelect('cita.estadoCita', 'EstadoCita')
        .leftJoinAndSelect('cita.tipoCita', 'TipoCita')
        .where('cita.usuariocitaequipo = :id', { id: element.id })
        .getMany();

      let celdaInicio = 4
      let celdaFin = 6
      for (let index = 0; index < citas.length; index++) {
        const elementCita = citas[index]

        const fechaCita = new Date(elementCita.fecha)

        let semana;
        for (let i = 0; i < semanas.length; i++) {
          const rango = semanas[i];
          const fechaInicio = new Date(rango.fechaInicio);
          const fechaFin = new Date(rango.fechaFin);
          if (fechaCita >= fechaInicio && fechaCita <= fechaFin) {
            semana = rango.numeroSemana;
          }
        }

        hoja.range(`A${celdaInicio}:A${celdaFin}`).merged(true).value([[semana, null, null, null]]);
        hoja.range(`B${celdaInicio}:B${celdaFin}`).merged(true).value([[format(fechaCita, "MMMM dd"), null, null, null]]);
        hoja.range(`C${celdaInicio}:C${celdaFin}`).merged(true).value([[elementCita.hora.toString().split(':')[0] + ':' + elementCita.hora.toString().split(':')[1], null, null, null]]);
        hoja.range(`D${celdaInicio}:D${celdaFin}`).merged(true).value([[elementCita.link, null, null, null]]);
        hoja.range(`E${celdaInicio}:E${celdaFin}`).merged(true).value([[elementCita.estadoCita.nombre, null, null, null]]);
        hoja.range(`F${celdaInicio}:F${celdaFin}`).merged(true).value([[elementCita.tipoCita.nombre, null, null, null]]);
        if (elementCita.estadoCita.id != 1) {
          hoja.range(`G${celdaInicio}:G${celdaFin}`).merged(true).value([[elementCita.equipocita.codigoEquipo, null, null, null]]);

          const estudiantes = resultadosAgrupados[elementCita.equipocita.codigoEquipo]
          for (let index = 0; index < estudiantes.length; index++) {
            const element = estudiantes[index];
            hoja.cell(`H${celdaInicio + index}`).value(element.nombre)
          }
        } else {
          hoja.range(`G${celdaInicio}:G${celdaFin}`).merged(true).value([[null, null, null, null]]);
        }

        celdaInicio = celdaInicio + 3
        celdaFin = celdaFin + 3
      }
      //estilos

      hoja.column("A").width(12);
      hoja.column("B").width(11);
      hoja.column("C").width(11);
      hoja.column("D").width(35);
      hoja.column("E").width(16);
      hoja.column("F").width(13);
      hoja.column("G").width(11);
      hoja.column("H").width(25);
      hoja.range("A1:B1").style({ fill: { color: 'e2efd9' }, border: true, horizontalAlignment: 'center', bold: true, fontFamily: 'Arial', fontSize: 14 })
      hoja.range("C1:H1").style({ border: true, horizontalAlignment: 'center', bold: false, fontFamily: 'Arial', fontSize: 14 })
      hoja.cell("A2").style({ fill: { color: 'e2efd9' }, border: true, horizontalAlignment: 'center', bold: true, fontFamily: 'Arial', fontSize: 14 })
      hoja.cell("B2").style({ border: true, horizontalAlignment: 'center', bold: false, fontFamily: 'Arial', fontSize: 14 })
      hoja.range("C2:D2").style({ fill: { color: 'e2efd9' }, border: true, horizontalAlignment: 'center', bold: true, fontFamily: 'Arial', fontSize: 14 })
      hoja.range("E2:H2").style({ border: true, horizontalAlignment: 'center', bold: false, fontFamily: 'Arial', fontSize: 14 })
      hoja.range("A3:H3").style({ fill: { color: 'e2efd9' }, border: true, horizontalAlignment: 'center', bold: true, fontFamily: 'Arial', fontSize: 14 })
      hoja.range(`A4:H${celdaFin}`).style({
        verticalAlignment: 'middle', border: true, horizontalAlignment: 'center', bold: false, fontFamily: 'Arial', fontSize: 14
      })


    }


    const buffer = await libro.outputAsync();
    const filePath = './public/Excels/HorasAsesor.xlsx';
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }
  async update(id: number, updateHoraSemanalDto: UpdateHoraSemanalDto) {
    const existe = await this.repository
      .createQueryBuilder('horaSemanal')
      .innerJoinAndSelect('horaSemanal.hora', 'usuario')
      .where('usuario.id = :id', { id })
      .getOne();
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateHoraSemanalDto);
  }

  remove(id: number) {
    return `This action removes a #${id} horaSemanal`;
  }
}
