/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeguimientoPpiService {

  findAll() {
    return `This action returns all seguimientoPpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seguimientoPpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} seguimientoPpi`;
  }
}
