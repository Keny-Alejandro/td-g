import { Module } from '@nestjs/common';
import { EstadoSeguimientoCambioService } from './estado_seguimiento_cambio.service';
import { EstadoSeguimientoCambioController } from './estado_seguimiento_cambio.controller';

@Module({
  controllers: [EstadoSeguimientoCambioController],
  providers: [EstadoSeguimientoCambioService],
})
export class EstadoSeguimientoCambioModule {}
