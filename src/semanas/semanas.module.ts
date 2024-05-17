import { Module } from '@nestjs/common';
import { SemanasService } from './semanas.service';
import { SemanasController } from './semanas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semana } from './entities/semana.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Semana])],
  controllers: [SemanasController],
  providers: [SemanasService],
})
export class SemanasModule {}
