import { Module } from '@nestjs/common';
import { TipoCitaService } from './tipo_cita.service';
import { TipoCitaController } from './tipo_cita.controller';

@Module({
  controllers: [TipoCitaController],
  providers: [TipoCitaService],
})
export class TipoCitaModule {}
