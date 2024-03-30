import { Injectable } from '@nestjs/common';
import { CreateCitasAsesoriaPpiDto } from './dto/create-citas_asesoria_ppi.dto';
import { UpdateCitasAsesoriaPpiDto } from './dto/update-citas_asesoria_ppi.dto';

@Injectable()
export class CitasAsesoriaPpiService {
  create(createCitasAsesoriaPpiDto: CreateCitasAsesoriaPpiDto) {
    return 'This action adds a new citasAsesoriaPpi';
  }

  findAll() {
    return `This action returns all citasAsesoriaPpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} citasAsesoriaPpi`;
  }

  update(id: number, updateCitasAsesoriaPpiDto: UpdateCitasAsesoriaPpiDto) {
    return `This action updates a #${id} citasAsesoriaPpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} citasAsesoriaPpi`;
  }
}
