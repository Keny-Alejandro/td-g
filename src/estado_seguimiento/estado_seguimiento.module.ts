import { Module } from '@nestjs/common';
import { EstadoSeguimientoService } from './estado_seguimiento.service';
import { EstadoSeguimientoController } from './estado_seguimiento.controller';

@Module({
  controllers: [EstadoSeguimientoController],
  providers: [EstadoSeguimientoService],
})
export class EstadoSeguimientoModule {}
