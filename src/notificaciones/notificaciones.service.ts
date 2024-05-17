import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectRepository(Notificacione) private readonly repository: Repository<Notificacione>
  ) {
  }

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    return this.repository.save(createNotificacioneDto);
  }

  async findAll() {
    return this.repository.find({ order: { id: 'DESC' } });
  }

  async findPendientes() {
    return this.repository
      .createQueryBuilder('Notificaciones')
      .where('Notificaciones.estado = :id', { id: 1 })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  async update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {

    const existe = await this.repository.find({ where: { id } });
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(id, updateNotificacioneDto);
  }

  async remove(id: number) {
    const notificacion = await this.repository
      .createQueryBuilder('Notificaciones')
      .where('Notificaciones.id = :id', { id: id })
      .getOne();
    if (notificacion) {
      await this.repository.remove(notificacion);
      return `La notificación con el ID ${id} ha sido eliminada exitosamente.`;
    } else {
      return `No se encontró ninguna notificación con el ID ${id}.`;
    }
  }
}
