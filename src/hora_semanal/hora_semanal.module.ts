import { Module } from '@nestjs/common';
import { HoraSemanalService } from './hora_semanal.service';
import { HoraSemanalController } from './hora_semanal.controller';

@Module({
  controllers: [HoraSemanalController],
  providers: [HoraSemanalService],
})
export class HoraSemanalModule {}
