import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeguimientoPpiDto } from './dto/create-seguimiento_ppi.dto';
import { UpdateSeguimientoPpiDto } from './dto/update-seguimiento_ppi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SeguimientoPpi } from './entities/seguimiento_ppi.entity';
import { Repository } from 'typeorm';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { EstadoSeguimiento } from 'src/estado_seguimiento/entities/estado_seguimiento.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Injectable()
export class SeguimientoPpiService {

  constructor(
    @InjectRepository(SeguimientoPpi) private readonly repository: Repository<SeguimientoPpi>,
    @InjectRepository(EquipoUsuario) private readonly repositoryEquipo: Repository<EquipoUsuario>,
    @InjectRepository(EstadoSeguimiento) private readonly repositoryEstado: Repository<EstadoSeguimiento>,
    @InjectRepository(EstadoSeguimientoCambio) private readonly repositoryEstadoSeg: Repository<EstadoSeguimientoCambio>,
    @InjectRepository(CitasAsesoriaPpi) private readonly repositoryCita: Repository<CitasAsesoriaPpi>
  ) {
  }

  async create(createSeguimientoPpiDto: CreateSeguimientoPpiDto) {
    const Creado = await this.repository.save(createSeguimientoPpiDto);
    if (Creado) {
      const estado = await this.repositoryEstado
        .createQueryBuilder('EstadoSeguimiento')
        .where('EstadoSeguimiento.id = :id', { id: 1 })
        .getOne();
      const EstadoSeguimientoCreacion = new EstadoSeguimientoCambio();
      EstadoSeguimientoCreacion.fecha = Creado.fecha;
      EstadoSeguimientoCreacion.estadoSeguimiento = estado;
      EstadoSeguimientoCreacion.seguimiento = Creado;
      return this.repositoryEstadoSeg.save(EstadoSeguimientoCreacion);
    }
    return null;
  }

  async findAll() {
    return this.repository.find();
  }

  async finOne(id: number) {
    return await this.repository
      .createQueryBuilder('SeguimientoPpi')
      .where('SeguimientoPpi.id = :id', { id: id })
      .getMany();
  }

  async findByCita(id: number) {
    return await this.repository
      .createQueryBuilder('SeguimientoPpi')
      .where('SeguimientoPpi.citas = :citas', { citas: id })
      .getOne();
  }

  async findByEquipo(id: number) {
    const data = await this.repository
      .createQueryBuilder('SeguimientoPpi')
      .leftJoinAndSelect('SeguimientoPpi.citas', 'CitasAsesoriaPpi')
      .leftJoinAndSelect('CitasAsesoriaPpi.usuariocitaequipo', 'usuario')
      .leftJoinAndSelect('CitasAsesoriaPpi.equipocita', 'EquipoPpi')
      .where('EquipoPpi.codigoEquipo = :codigoEquipo', { codigoEquipo: id })
      .getMany();

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const estado = await this.repositoryEstadoSeg
        .createQueryBuilder('EstadoSeguimientoCambio')
        .leftJoinAndSelect('EstadoSeguimientoCambio.estadoSeguimiento', 'EstadoSeguimiento')
        .where('EstadoSeguimientoCambio.seguimiento = :id', { id: element.id })
        .getMany();
      data[index]["estados"] = estado;
    }
    return data;
  }

  async findEstudiantesByID(id: number) {
    const respuesta = await this.repository
      .createQueryBuilder('SeguimientoPpi')
      .leftJoinAndSelect('SeguimientoPpi.citas', 'CitasAsesoriaPpi')
      .leftJoinAndSelect('CitasAsesoriaPpi.equipocita', 'EquipoPpi')
      .where('SeguimientoPpi.id = :id', { id: id })
      .getMany();
    const codigoEquipo = respuesta[0].citas.equipocita.codigoEquipo;
    const estudiantes = await this.repositoryEquipo
      .createQueryBuilder('EquipoUsuario')
      .leftJoinAndSelect('EquipoUsuario.usuario', 'usuario')
      .where('EquipoUsuario.codigoEquipo = :id', { id: codigoEquipo })
      .getMany();

    let resultado = []
    estudiantes.forEach(element => {
      resultado.push(element.usuario)
    });

    return resultado;
  }
  async update(id: number, updateSeguimientoPpiDto: UpdateSeguimientoPpiDto) {
    const existe = await this.repository.find({ where: { id } });
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateSeguimientoPpiDto);
  }

  async updateCancelacionCita(id: number, updateSeguimientoPpiDto: UpdateSeguimientoPpiDto) {
    const existe = await this.repository
      .createQueryBuilder('SeguimientoPpi')
      .where('SeguimientoPpi.citas = :id', { id: id })
      .getOne();
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    existe.citas = updateSeguimientoPpiDto.citas;
    const seguimientoCamnbio = await this.repositoryEstadoSeg
      .createQueryBuilder('EstadoSeguimientoCambio')
      .where('EstadoSeguimientoCambio.seguimiento = :id', { id: existe.id })
      .getOne();

    const citas = await this.repositoryCita
      .createQueryBuilder('citas')
      .where('citas.id = :id', { id: updateSeguimientoPpiDto.citas })
      .getOne();

    console.log(citas)
    seguimientoCamnbio.fecha = citas.fecha;

    console.log("-----------------------------------")
    console.log(citas)
    await this.repository.save(existe);
    await this.repositoryEstadoSeg.save(seguimientoCamnbio);

    return existe;
  }


  async updateByAsistencia(id: number, updateSeguimientoPpiDto: UpdateSeguimientoPpiDto) {
    const existe = await this.repository.find({ where: { id } });
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateSeguimientoPpiDto);
  }

  async remove(id: number) {
    console.log(id)
    const exist = await this.repository
      .createQueryBuilder('SeguimientoPpi')
      .where('SeguimientoPpi.citas = :citas', { citas: id })
      .getOne()

    console.log(1)
    const cita = await this.repositoryCita
      .createQueryBuilder('cita')
      .where('cita.id = :id', { id: id })
      .getOne()

    console.log(2)
    const seguimientoCambio = await this.repositoryEstadoSeg
      .createQueryBuilder('seguimientoCambio')
      .where('seguimientoCambio.seguimiento = :seguimiento', { seguimiento: exist.id })
      .andWhere("DATE(seguimientoCambio.fecha AT TIME ZONE 'America/Bogota') = :fecha", { fecha: cita.fecha })
      .getOne()

    console.log(3)
    console.log(exist)
    console.log(cita)
    console.log(seguimientoCambio)

    if (!exist || !seguimientoCambio) {
      throw new NotFoundException();
    }

    const val2 = await this.repositoryEstadoSeg.remove(seguimientoCambio);
    const val1 = await this.repository.remove(exist);
    if (val1 && val2)
      return true;
    else
      return false
  }
}
