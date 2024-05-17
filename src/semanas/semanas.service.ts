import { Injectable } from '@nestjs/common';
import { CreateSemanaDto } from './dto/create-semana.dto';
import { UpdateSemanaDto } from './dto/update-semana.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semana } from './entities/semana.entity';

@Injectable()
export class SemanasService {

  constructor(
    @InjectRepository(Semana) private readonly repository: Repository<Semana>
  ) {
  }

  async create(createSemanaDto: CreateSemanaDto) {
    const semanaExistente=await this.repository
      .createQueryBuilder('Semana')
      .where('Semana.numeroSemana = :numeroSemana', { numeroSemana: createSemanaDto.numeroSemana }) 
      .getOne(); 
 
    if (semanaExistente) {
      semanaExistente.fechaInicio = createSemanaDto.fechaInicio;
      semanaExistente.fechaFin = createSemanaDto.fechaFin;
      return await this.repository.save(semanaExistente);
    } else { 
      return await this.repository.save(createSemanaDto);
    }
  }

  async findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} semana`;
  }

  update(id: number, updateSemanaDto: UpdateSemanaDto) {
    return `This action updates a #${id} semana`;
  }

  remove(id: number) {
    return `This action removes a #${id} semana`;
  }
  async removeAll() {
    return await this.repository.delete({}); 
  }
}
