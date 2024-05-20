/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoPpiDto } from './dto/create-equipo_ppi.dto';
import { UpdateEquipoPpiDto } from './dto/update-equipo_ppi.dto';
import { EquipoPpi } from './entities/equipo_ppi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Tree } from 'typeorm';
import * as fs from 'fs';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class EquipoPpiService {
  constructor(
    @InjectRepository(EquipoPpi)
    private readonly repository: Repository<EquipoPpi>,
    @InjectRepository(EquipoPpiPjic)
    private readonly repositoryPijc: Repository<EquipoPpiPjic>,
    @InjectRepository(Asignatura)
    private readonly repositoryAsig: Repository<Asignatura>,
    @InjectRepository(EquipoUsuario)
    private readonly repositoryEqUsu: Repository<EquipoUsuario>,
    @InjectRepository(SeguimientoPpi)
    private readonly repositorySeg: Repository<SeguimientoPpi>,
    @InjectRepository(CitasAsesoriaPpi)
    private readonly repositoryCita: Repository<CitasAsesoriaPpi>,
    @InjectRepository(Usuario)
    private readonly repositoryUsuario: Repository<Usuario>,
  ) {}

  async create(createEquipoPpiDto: CreateEquipoPpiDto) {
    return this.repository.save(createEquipoPpiDto);
  }

  async obtenerBitacoraGrupo(id: number): Promise<any[]> {
    const query = `
      SELECT
        b."Bitacora_PPI_ID",
        b."Codigo_Equipo",
        b."Alias_Proyecto",
        b."Descripcion_Proyecto",
        b."Alcance_Proyecto",
        b."Alcance_Socializacion_Uno",
        b."Alcance_Socializacion_Dos"
      FROM
        "Bitacora_PPI" b
      WHERE
        b."Codigo_Equipo" = $1
      ORDER BY
        b."Codigo_Equipo" ASC;
    `;
    const result = await this.repository.query(query, [id]);
    return result;
  }

  async exportData(id: number) {
    const XlsxPopulate = require('xlsx-populate');

    if (id != -1) {
      const libro = await XlsxPopulate.fromBlankAsync();
      const hoja = await libro.sheet(0);
      hoja.name(id.toString());

      const encabezados = await this.repository
        .createQueryBuilder('equipoPpi')
        .where('equipoPpi.codigoEquipo = :id', { id: id })
        .getOne();

      const asignatura = await this.repositoryAsig
        .createQueryBuilder('Asignatura')
        .leftJoinAndSelect('Asignatura.equipo', 'EquipoUsuario')
        .where('EquipoUsuario.codigoEquipo = :id', { id: id })
        .getOne();

      const modSol = await this.repositoryPijc
        .createQueryBuilder('equipoPpiPjic')
        .leftJoinAndSelect('equipoPpiPjic.equipousuariopjic', 'equipoUsuario')
        .leftJoinAndSelect('equipoPpiPjic.usuariopjic', 'usuario')
        .where('equipoUsuario.codigoEquipo = :id', { id: id })
        .getOne();

      const estudiantes = await this.repositoryEqUsu
        .createQueryBuilder('EquipoUsuario')
        .leftJoinAndSelect('EquipoUsuario.usuario', 'usuario')
        .where('EquipoUsuario.codigoEquipo = :id', { id: id })
        .getMany();

      const citas = await this.repositoryCita
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.equipocita', 'EquipoPpi')
        .leftJoinAndSelect('cita.usuariocitaequipo', 'usuario')
        .where('EquipoPpi.codigoEquipo = :id', { id: id })
        .getMany();
      //Encabezado
      hoja
        .range('A1:D1')
        .merged(true)
        .value([['MÓDULO SOL: ' + asignatura.nombre, null, null, null]]);

      hoja
        .range('E1:F1')
        .merged(true)
        .value([['NOMBRE PROFESOR: ' + modSol.usuariopjic.nombre, null]]);
      hoja.cell('G1').value('CARPETA');
      hoja.cell('G2').value(id);
      hoja
        .range('A2:F2')
        .merged(true)
        .value([[encabezados.nombre, null, null, null, null, null, null]]);
      hoja
        .range('A3:D3')
        .merged(true)
        .value([['NOMBRE COMPLETO -  INTEGRANTES', null, null, null]]);
      hoja
        .range('E3:G3')
        .merged(true)
        .value([['CORREO:', null]]);
      //estudiantes
      for (let index = 0; index < 3; index++) {
        const n = 4 + index;

        if (estudiantes[index] !== undefined && estudiantes[index] !== null) {
          hoja
            .range(`A${n}:D${n}`)
            .merged(true)
            .value([[estudiantes[index].usuario.nombre, null, null, null]]);
          hoja
            .range(`E${n}:G${n}`)
            .merged(true)
            .value([[estudiantes[index].usuario.correo, null, null, null]]);
        } else {
          hoja
            .range(`A${n}:D${n}`)
            .merged(true)
            .value([['', null, null, null]]);
          hoja
            .range(`E${n}:G${n}`)
            .merged(true)
            .value([['', null, null, null]]);
        }
      }

      hoja
        .range('A7:G7')
        .merged(true)
        .value([
          [
            'DESCRIPCIÓN DETALLADA DEL PROYECTO (Diligencía módulo sol)',
            null,
            null,
            null,
          ],
        ]);
      hoja
        .range('A8:G8')
        .merged(true)
        .value([[encabezados.descripcion, null, null, null]]);
      hoja
        .range('A9:G9')
        .merged(true)
        .value([['ALCANCE (Diligencia módulo sol)', null, null, null]]);
      hoja
        .range('A10:E10')
        .merged(true)
        .value([['ALCANCE DETALLADO DEL PROYECTO', null, null, null]]);
      hoja
        .range('A11:E11')
        .merged(true)
        .value([[encabezados.alcance, null, null, null]]);
      hoja.cell('F10').value('ALCANCE: 1RA SOCIALIZACIÓN');
      hoja.cell('F11').value(encabezados.socializacionuno);
      hoja.cell('G10').value('ALCANCE: 2DA SOCIALIZACIÓN');
      hoja.cell('G11').value(encabezados.socializaciondos);
      //Seguimiento-Asesorias
      hoja.range('A12:G12').merged(true);
      hoja.cell('A13').value('SEMANA');
      hoja.cell('B13').value('FECHA');
      hoja.cell('C13').value('ASISTENCIA DE ESTUDIANTES');
      hoja.cell('D13').value('S/N');
      hoja.cell('E13').value('OBSERVACIONES Y CORRECCIONES');
      hoja.cell('F13').value('COMPROMISO SIGUIENTE ASESORÍA');
      hoja.cell('G13').value('NOMBRE DE LA PERSONA QUE DIO LA ASESORIA');
      let startRow = 14;
      let endRow = 16;
      for (let index = 0; index < citas.length; index++) {
        if (citas[index] !== undefined && citas[index] !== null) {
          const seguimiento = await this.repositorySeg
            .createQueryBuilder('SeguimientoPpi')
            .where('SeguimientoPpi.citas = :id', { id: citas[index].id })
            .getOne();
          if (seguimiento !== undefined && seguimiento !== null) {
            hoja
              .range(`A${startRow}:A${endRow}`)
              .merged(true)
              .value([[seguimiento.semana, null, null, null]]);
            hoja
              .range(`B${startRow}:B${endRow}`)
              .merged(true)
              .value([
                [
                  format(new Date(citas[index].fecha), 'MMMM d', {
                    locale: es,
                  }),
                  null,
                  null,
                  null,
                ],
              ]);

            for (let i = 0; i < 3; i++) {
              const nombre1 = `estudiante${i + 1}`;
              const nombre2 = `asistenciaEstudiante${i + 1}`;
              const usuario = await this.repositoryUsuario
                .createQueryBuilder('usuario')
                .where('usuario.id = :id', { id: seguimiento[nombre1] })
                .getOne();
              if (usuario !== undefined && usuario !== null) {
                hoja.cell(`C${startRow + i}`).value(usuario.nombre);
                hoja
                  .cell(`D${startRow + i}`)
                  .value(seguimiento[nombre2] === 1 ? 'Si' : 'No');
              }
            }
            hoja
              .range(`E${startRow}:E${endRow}`)
              .merged(true)
              .value([[seguimiento.observacion, null, null, null]]);
            hoja
              .range(`F${startRow}:F${endRow}`)
              .merged(true)
              .value([[seguimiento.compromiso, null, null, null]]);
            hoja
              .range(`G${startRow}:G${endRow}`)
              .merged(true)
              .value([
                [citas[index].usuariocitaequipo.nombre, null, null, null],
              ]);
          } else {
            hoja
              .range(`A${startRow}:A${endRow}`)
              .merged(true)
              .value([[null, null, null, null]]);
            hoja
              .range(`B${startRow}:B${endRow}`)
              .merged(true)
              .value([[null, null, null, null]]);
          }
        } else {
          hoja
            .range(`A${startRow}:A${endRow}`)
            .merged(true)
            .value([[null, null, null, null]]);
          hoja
            .range(`B${startRow}:B${endRow}`)
            .merged(true)
            .value([[null, null, null, null]]);
          hoja
            .range(`E${startRow}:E${endRow}`)
            .merged(true)
            .value([[null, null, null, null]]);
          hoja
            .range(`F${startRow}:F${endRow}`)
            .merged(true)
            .value([[null, null, null, null]]);
          hoja
            .range(`G${startRow}:G${endRow}`)
            .merged(true)
            .value([[null, null, null, null]]);
        }

        startRow = startRow + 3;
        endRow = endRow + 3;
      }
      hoja
        .range(`A14:A${endRow}`)
        .style({
          verticalAlignment: 'middle',
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 16,
        });
      hoja
        .range(`B14:G${endRow}`)
        .style({
          verticalAlignment: 'middle',
          border: true,
          horizontalAlignment: 'center',
          bold: false,
          fontFamily: 'Arial',
          fontSize: 12,
        });

      hoja.usedRange().style({ horizontalAlignment: 'center' });
      hoja.column('A').width(10);
      hoja.column('B').width(20);
      hoja.column('C').width(31);
      hoja.column('D').width(6);
      hoja.column('E').width(37);
      hoja.column('F').width(43);
      hoja.column('G').width(47);

      hoja.row('13').height(30.75);

      hoja
        .range('A1:G1')
        .style({
          fill: { color: 'e2efd9' },
          border: true,
          horizontalAlignment: 'start',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 14,
        });
      hoja
        .range('A2:F2')
        .style({
          border: true,
          horizontalAlignment: 'center',
          bold: false,
          fontFamily: 'Arial',
          fontSize: 16,
        });
      hoja
        .cell('G2')
        .style({
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 16,
        });
      hoja
        .range('A3:G3')
        .style({
          fill: { color: 'e2efd9' },
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 12,
        });
      hoja
        .range('A4:G6')
        .style({
          border: true,
          horizontalAlignment: 'center',
          bold: false,
          fontFamily: 'Arial',
          fontSize: 10,
        });
      hoja
        .range('A7:G7')
        .style({
          fill: { color: 'e2efd9' },
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 12,
        });
      hoja
        .range('A8:G8')
        .style({
          border: true,
          horizontalAlignment: 'center',
          bold: false,
          fontFamily: 'Arial',
          fontSize: 10,
        });
      hoja
        .range('A9:G10')
        .style({
          fill: { color: 'e2efd9' },
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 12,
        });
      hoja
        .range('A11:G11')
        .style({
          border: true,
          horizontalAlignment: 'center',
          bold: false,
          fontFamily: 'Arial',
          fontSize: 10,
        });
      hoja
        .range('A12:G12')
        .style({
          fill: { color: 'e2efd9' },
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 12,
        });
      hoja
        .range('A13:G13')
        .style({
          fill: { color: 'e2efd9' },
          verticalAlignment: 'middle',
          border: true,
          horizontalAlignment: 'center',
          bold: true,
          fontFamily: 'Arial',
          fontSize: 11,
          wrapText: true,
        });

      const buffer = await libro.outputAsync();
      const filePath = './public/Excels/Bitacoras.xlsx';
      fs.writeFileSync(filePath, buffer);

      return filePath;
    } else if (id == -1) {
      const libro = await XlsxPopulate.fromBlankAsync();
      const equipos = await this.repository
        .createQueryBuilder('equipoPpi')
        .orderBy('equipoPpi.codigoEquipo', 'ASC')
        .getMany();

      for (let index = 0; index < equipos.length; index++) {
        const equipo = equipos[index];
        if (equipo) {
          libro.addSheet(equipo.codigoEquipo.toString());
        }
      }

      for (let index = 0; index < equipos.length; index++) {
        if (equipos[index] !== undefined && equipos[index] !== null) {
          const element = equipos[index];
          const hoja = await libro.sheet(
            equipos[index].codigoEquipo.toString(),
          );
          hoja.name(equipos[index].codigoEquipo.toString());
          const idCod = element.codigoEquipo;
          const encabezados = await this.repository
            .createQueryBuilder('equipoPpi')
            .where('equipoPpi.codigoEquipo = :idCod', { idCod: idCod })
            .getOne();

          const asignatura = await this.repositoryAsig
            .createQueryBuilder('Asignatura')
            .leftJoinAndSelect('Asignatura.equipo', 'EquipoUsuario')
            .where('EquipoUsuario.codigoEquipo = :idCod', { idCod: idCod })
            .getOne();

          const modSol = await this.repositoryPijc
            .createQueryBuilder('equipoPpiPjic')
            .leftJoinAndSelect(
              'equipoPpiPjic.equipousuariopjic',
              'equipoUsuario',
            )
            .leftJoinAndSelect('equipoPpiPjic.usuariopjic', 'usuario')
            .where('equipoUsuario.codigoEquipo = :idCod', { idCod: idCod })
            .getOne();

          const estudiantes = await this.repositoryEqUsu
            .createQueryBuilder('EquipoUsuario')
            .leftJoinAndSelect('EquipoUsuario.usuario', 'usuario')
            .where('EquipoUsuario.codigoEquipo = :idCod', { idCod: idCod })
            .getMany();

          const citas = await this.repositoryCita
            .createQueryBuilder('cita')
            .leftJoinAndSelect('cita.equipocita', 'EquipoPpi')
            .leftJoinAndSelect('cita.usuariocitaequipo', 'usuario')
            .where('EquipoPpi.codigoEquipo = :idCod', { idCod: idCod })
            .getMany();
          //Encabezado
          hoja
            .range('A1:D1')
            .merged(true)
            .value([['MÓDULO SOL: ' + asignatura.nombre, null, null, null]]);

          hoja
            .range('E1:F1')
            .merged(true)
            .value([['NOMBRE PROFESOR: ' + modSol.usuariopjic.nombre, null]]);
          hoja.cell('G1').value('CARPETA');
          hoja.cell('G2').value(idCod);
          hoja
            .range('A2:F2')
            .merged(true)
            .value([[encabezados.nombre, null, null, null, null, null, null]]);
          hoja
            .range('A3:D3')
            .merged(true)
            .value([['NOMBRE COMPLETO -  INTEGRANTES', null, null, null]]);
          hoja
            .range('E3:G3')
            .merged(true)
            .value([['CORREO:', null]]);
          //estudiantes
          for (let index = 0; index < 3; index++) {
            const n = 4 + index;

            if (
              estudiantes[index] !== undefined &&
              estudiantes[index] !== null
            ) {
              hoja
                .range(`A${n}:D${n}`)
                .merged(true)
                .value([[estudiantes[index].usuario.nombre, null, null, null]]);
              hoja
                .range(`E${n}:G${n}`)
                .merged(true)
                .value([[estudiantes[index].usuario.correo, null, null, null]]);
            } else {
              hoja
                .range(`A${n}:D${n}`)
                .merged(true)
                .value([['', null, null, null]]);
              hoja
                .range(`E${n}:G${n}`)
                .merged(true)
                .value([['', null, null, null]]);
            }
          }

          hoja
            .range('A7:G7')
            .merged(true)
            .value([
              [
                'DESCRIPCIÓN DETALLADA DEL PROYECTO (Diligencía módulo sol)',
                null,
                null,
                null,
              ],
            ]);
          hoja
            .range('A8:G8')
            .merged(true)
            .value([[encabezados.descripcion, null, null, null]]);
          hoja
            .range('A9:G9')
            .merged(true)
            .value([['ALCANCE (Diligencia módulo sol)', null, null, null]]);
          hoja
            .range('A10:E10')
            .merged(true)
            .value([['ALCANCE DETALLADO DEL PROYECTO', null, null, null]]);
          hoja
            .range('A11:E11')
            .merged(true)
            .value([[encabezados.alcance, null, null, null]]);
          hoja.cell('F10').value('ALCANCE: 1RA SOCIALIZACIÓN');
          hoja.cell('F11').value(encabezados.socializacionuno);
          hoja.cell('G10').value('ALCANCE: 2DA SOCIALIZACIÓN');
          hoja.cell('G11').value(encabezados.socializaciondos);
          //Seguimiento-Asesorias
          hoja.range('A12:G12').merged(true);
          hoja.cell('A13').value('SEMANA');
          hoja.cell('B13').value('FECHA');
          hoja.cell('C13').value('ASISTENCIA DE ESTUDIANTES');
          hoja.cell('D13').value('S/N');
          hoja.cell('E13').value('OBSERVACIONES Y CORRECCIONES');
          hoja.cell('F13').value('COMPROMISO SIGUIENTE ASESORÍA');
          hoja.cell('G13').value('NOMBRE DE LA PERSONA QUE DIO LA ASESORIA');
          let startRow = 14;
          let endRow = 16;
          for (let index = 0; index < citas.length; index++) {
            if (citas[index] !== undefined && citas[index] !== null) {
              const seguimiento = await this.repositorySeg
                .createQueryBuilder('SeguimientoPpi')
                .where('SeguimientoPpi.citas = :idCod', {
                  idCod: citas[index].id,
                })
                .getOne();
              if (seguimiento !== undefined && seguimiento !== null) {
                hoja
                  .range(`A${startRow}:A${endRow}`)
                  .merged(true)
                  .value([[seguimiento.semana, null, null, null]]);
                hoja
                  .range(`B${startRow}:B${endRow}`)
                  .merged(true)
                  .value([
                    [
                      format(new Date(citas[index].fecha), 'MMMM d', {
                        locale: es,
                      }),
                      null,
                      null,
                      null,
                    ],
                  ]);

                for (let i = 0; i < 3; i++) {
                  const nombre1 = `estudiante${i + 1}`;
                  const nombre2 = `asistenciaEstudiante${i + 1}`;
                  const usuario = await this.repositoryUsuario
                    .createQueryBuilder('usuario')
                    .where('usuario.id = :idCod', {
                      idCod: seguimiento[nombre1],
                    })
                    .getOne();
                  if (usuario !== undefined && usuario !== null) {
                    hoja.cell(`C${startRow + i}`).value(usuario.nombre);
                    hoja
                      .cell(`D${startRow + i}`)
                      .value(seguimiento[nombre2] === 1 ? 'Si' : 'No');
                  }
                }

                hoja
                  .range(`E${startRow}:E${endRow}`)
                  .merged(true)
                  .value([[seguimiento.observacion, null, null, null]]);
                hoja
                  .range(`F${startRow}:F${endRow}`)
                  .merged(true)
                  .value([[seguimiento.compromiso, null, null, null]]);
                hoja
                  .range(`G${startRow}:G${endRow}`)
                  .merged(true)
                  .value([
                    [citas[index].usuariocitaequipo.nombre, null, null, null],
                  ]);
              } else {
                hoja
                  .range(`A${startRow}:A${endRow}`)
                  .merged(true)
                  .value([[null, null, null, null]]);
                hoja
                  .range(`B${startRow}:B${endRow}`)
                  .merged(true)
                  .value([[null, null, null, null]]);
              }
            } else {
              hoja
                .range(`A${startRow}:A${endRow}`)
                .merged(true)
                .value([[null, null, null, null]]);
              hoja
                .range(`B${startRow}:B${endRow}`)
                .merged(true)
                .value([[null, null, null, null]]);
              hoja
                .range(`E${startRow}:E${endRow}`)
                .merged(true)
                .value([[null, null, null, null]]);
              hoja
                .range(`F${startRow}:F${endRow}`)
                .merged(true)
                .value([[null, null, null, null]]);
              hoja
                .range(`G${startRow}:G${endRow}`)
                .merged(true)
                .value([[null, null, null, null]]);
            }
            startRow = startRow + 3;
            endRow = endRow + 3;
          }
          hoja
            .range(`A14:A${endRow}`)
            .style({
              verticalAlignment: 'middle',
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 16,
            });
          hoja
            .range(`B14:G${endRow}`)
            .style({
              verticalAlignment: 'middle',
              border: true,
              horizontalAlignment: 'center',
              bold: false,
              fontFamily: 'Arial',
              fontSize: 12,
            });

          hoja.usedRange().style({ horizontalAlignment: 'center' });
          hoja.column('A').width(10);
          hoja.column('B').width(20);
          hoja.column('C').width(31);
          hoja.column('D').width(6);
          hoja.column('E').width(37);
          hoja.column('F').width(43);
          hoja.column('G').width(47);

          hoja.row('13').height(30.75);

          hoja
            .range('A1:G1')
            .style({
              fill: { color: 'e2efd9' },
              border: true,
              horizontalAlignment: 'start',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 14,
            });
          hoja
            .range('A2:F2')
            .style({
              border: true,
              horizontalAlignment: 'center',
              bold: false,
              fontFamily: 'Arial',
              fontSize: 16,
            });
          hoja
            .cell('G2')
            .style({
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 16,
            });
          hoja
            .range('A3:G3')
            .style({
              fill: { color: 'e2efd9' },
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 12,
            });
          hoja
            .range('A4:G6')
            .style({
              border: true,
              horizontalAlignment: 'center',
              bold: false,
              fontFamily: 'Arial',
              fontSize: 10,
            });
          hoja
            .range('A7:G7')
            .style({
              fill: { color: 'e2efd9' },
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 12,
            });
          hoja
            .range('A8:G8')
            .style({
              border: true,
              horizontalAlignment: 'center',
              bold: false,
              fontFamily: 'Arial',
              fontSize: 10,
            });
          hoja
            .range('A9:G10')
            .style({
              fill: { color: 'e2efd9' },
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 12,
            });
          hoja
            .range('A11:G11')
            .style({
              border: true,
              horizontalAlignment: 'center',
              bold: false,
              fontFamily: 'Arial',
              fontSize: 10,
            });
          hoja
            .range('A12:G12')
            .style({
              fill: { color: 'e2efd9' },
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 12,
            });
          hoja
            .range('A13:G13')
            .style({
              fill: { color: 'e2efd9' },
              verticalAlignment: 'middle',
              border: true,
              horizontalAlignment: 'center',
              bold: true,
              fontFamily: 'Arial',
              fontSize: 11,
              wrapText: true,
            });
        }
      }
      const buffer = await libro.outputAsync();
      const filePath = './public/Excels/Bitacoras.xlsx';
      fs.writeFileSync(filePath, buffer);

      return filePath;
    }
    return null;
  }
  
  async findAll() {
    return await this.repository
      .createQueryBuilder('equipoPpi')
      .orderBy('equipoPpi.codigoEquipo', 'ASC')
      .getMany();
  }

  async findByEquipo(id: number) {
    return await this.repository
      .createQueryBuilder('equipoPpi')
      .where('equipoPpi.codigoEquipo = :id', { id: id })
      .getOne();
  }

  async findOne(id: number) {
    return await this.repository.find({ where: { id } });
  }

  async update(id: number, updateEquipoPpiDto: UpdateEquipoPpiDto) {
    const existe = await this.repository.find({ where: { id } });
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateEquipoPpiDto);
  }
}
