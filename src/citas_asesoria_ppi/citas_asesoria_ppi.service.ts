import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitasAsesoriaPpiDto } from './dto/create-citas_asesoria_ppi.dto';
import { UpdateCitasAsesoriaPpiDto } from './dto/update-citas_asesoria_ppi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CitasAsesoriaPpi } from './entities/citas_asesoria_ppi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitasAsesoriaPpiService {

  constructor(
    @InjectRepository(CitasAsesoriaPpi) private readonly repository: Repository<CitasAsesoriaPpi>,
    @Inject('TIMEZONE') private readonly timezone: string) {
  }


  async create(createCitasAsesoriaPpiDto: CreateCitasAsesoriaPpiDto) {
    const creacion=await this.repository.save(createCitasAsesoriaPpiDto) 
    return creacion.id;
  }

  async findAll() {
    const citas = await this.repository
      .createQueryBuilder('Citas_Asesoria_PPI')
      .leftJoinAndSelect('Citas_Asesoria_PPI.estadoCita', 'Estado_Cita')
      .leftJoinAndSelect('Citas_Asesoria_PPI.usuariocitaequipo', 'usuario')
      .leftJoinAndSelect('Citas_Asesoria_PPI.equipocita', 'equipoPpi')
      .getMany();
    return citas;
  }




  async findRangeAsesor(Fechainicio: string, FechaFin: string, Usuario: string) {
    const citas = await this.repository
      .createQueryBuilder('citas')
      .leftJoinAndSelect('citas.estadoCita', 'estadoCita')
      .leftJoinAndSelect('citas.tipoCita', 'tipoCita')
      .leftJoinAndSelect('citas.observacionCita', 'observacionCita')
      .leftJoinAndSelect('citas.equipocita', 'equipocita')
      .leftJoinAndSelect('citas.usuariocitaequipo', 'usuariocitaequipo')
      .leftJoinAndSelect('citas.citas', 'citasRelacionadas')
      .where("DATE(citas.fecha AT TIME ZONE 'America/Bogota')  BETWEEN :start AND :end", { start: Fechainicio, end: FechaFin })
      .andWhere('usuariocitaequipo.id = :userId', { userId: Usuario })
      .orderBy('citas.hora', 'ASC')
      .getMany();
    return citas;
  }

  async findByAsesor(Usuario: string) {
    const citas = await this.repository
      .createQueryBuilder('citas')
      .leftJoinAndSelect('citas.estadoCita', 'estadoCita')
      .leftJoinAndSelect('citas.tipoCita', 'tipoCita')
      .leftJoinAndSelect('citas.observacionCita', 'observacionCita')
      .leftJoinAndSelect('citas.equipocita', 'equipocita')
      .leftJoinAndSelect('citas.usuariocitaequipo', 'usuariocitaequipo')
      .leftJoinAndSelect('citas.citas', 'citasRelacionadas')
      .where('usuariocitaequipo.id = :userId', { userId: Usuario })
      .orderBy('citas.hora', 'ASC')
      .getMany();
    return citas;
  }


  async findRangeEstado(Fechainicio: string, FechaFin: string, Usuario: string,Estado: string) {
    const citas = await this.repository
      .createQueryBuilder('citas')
      .leftJoinAndSelect('citas.estadoCita', 'estadoCita')
      .leftJoinAndSelect('citas.tipoCita', 'tipoCita')
      .leftJoinAndSelect('citas.observacionCita', 'observacionCita')
      .leftJoinAndSelect('citas.equipocita', 'equipocita')
      .leftJoinAndSelect('citas.usuariocitaequipo', 'usuariocitaequipo')
      .leftJoinAndSelect('citas.citas', 'citasRelacionadas')
      .where("DATE(citas.fecha AT TIME ZONE 'America/Bogota')  BETWEEN :start AND :end", { start: Fechainicio, end: FechaFin })
      .andWhere('estadoCita.id = :id', { id: Estado })
      .andWhere('usuariocitaequipo.id = :id', { id: Usuario })
      .orderBy('citas.hora', 'ASC')
      .getMany();
    return citas;
  }

  async findRangeEquipo(Usuario: string) {
    const citas = await this.repository
      .createQueryBuilder('citas')
      .leftJoinAndSelect('citas.estadoCita', 'estadoCita')
      .leftJoinAndSelect('citas.tipoCita', 'tipoCita')
      .leftJoinAndSelect('citas.observacionCita', 'observacionCita')
      .leftJoinAndSelect('citas.equipocita', 'equipocita')
      .leftJoinAndSelect('citas.usuariocitaequipo', 'usuariocitaequipo')
      .leftJoinAndSelect('citas.citas', 'citasRelacionadas')
      .where('equipocita.codigoEquipo = :userId', { userId: Usuario })
      .orderBy('citas.id', 'DESC')
      .getMany();
    return citas;
  }
  async findRangeEquipoFecha(Fechainicio: string, FechaFin: string, Usuario: string) {

    const citas = await this.repository
      .createQueryBuilder('citas')
      .leftJoinAndSelect('citas.estadoCita', 'estadoCita')
      .leftJoinAndSelect('citas.tipoCita', 'tipoCita')
      .leftJoinAndSelect('citas.observacionCita', 'observacionCita')
      .leftJoinAndSelect('citas.equipocita', 'equipocita')
      .leftJoinAndSelect('citas.usuariocitaequipo', 'usuariocitaequipo')
      .leftJoinAndSelect('citas.citas', 'citasRelacionadas')
      .where("DATE(citas.fecha AT TIME ZONE 'America/Bogota')  BETWEEN :start AND :end", { start: Fechainicio, end: FechaFin })
      .andWhere('equipocita.id = :userId', { userId: Usuario })
      .orderBy('citas.id', 'ASC')
      .getMany(); 
    return citas;
  }

  async findFechaHora(Fecha: string, Hora: string, Usuario: string) {
    const citas = await this.repository
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.usuariocitaequipo', 'usuariocitaequipo')
      .where(`DATE(cita.fecha AT TIME ZONE 'America/Bogota') = :fecha`, { fecha: Fecha })
      .andWhere('usuariocitaequipo.id = :userId', { userId: Usuario })
      .andWhere('cita.hora = :hora', { hora: Hora })
      .getMany();
    return citas;
  }

  async findOne(id: number) {
    const cita = await this.repository
      .createQueryBuilder('citas')
      .where('citas.id = :id', { id })
      .leftJoinAndSelect('citas.estadoCita', 'estadoCita')
      .leftJoinAndSelect('citas.tipoCita', 'tipoCita')
      .leftJoinAndSelect('citas.observacionCita', 'observacionCita')
      .leftJoinAndSelect('citas.equipocita', 'equipocita')
      .leftJoinAndSelect('citas.usuariocitaequipo', 'usuariocitaequipo')
      .leftJoinAndSelect('citas.citas', 'citasRelacionadas')
      .getOne();
    return cita;

  }

  async findCitaBySeguimiento(id: number) {
    const cita = await this.repository
      .createQueryBuilder('citas')
      .leftJoinAndSelect('citas.citas', 'SeguimientoPpi')
      .where('SeguimientoPpi.id = :id', { id })
      .getOne();
    return cita;

  }
  async update(id: number, updateCitasAsesoriaPpiDto: UpdateCitasAsesoriaPpiDto) {
    const existe = await this.repository.find({ where: { id } });
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateCitasAsesoriaPpiDto);
  }

  remove(id: number) {
    return `This action removes a #${id} citasAsesoriaPpi`;
  }
}
