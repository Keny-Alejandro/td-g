/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEntregaService } from './tipo_entrega.service';
import { TipoEntregaController } from './tipo_entrega.controller';
import { TipoEntrega } from './entities/tipo_entrega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoEntrega]),
  ],
  controllers: [TipoEntregaController],
  providers: [TipoEntregaService],
})
export class TipoEntregaModule {}
