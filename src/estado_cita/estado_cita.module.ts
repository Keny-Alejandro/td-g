import { Module } from '@nestjs/common';
import { EstadoCitaService } from './estado_cita.service';
import { EstadoCitaController } from './estado_cita.controller';

@Module({
  controllers: [EstadoCitaController],
  providers: [EstadoCitaService],
})
export class EstadoCitaModule {}
