import { Module } from '@nestjs/common';
import { EstadoSeguimientoCambioService } from './estado_seguimiento_cambio.service';
import { EstadoSeguimientoCambioController } from './estado_seguimiento_cambio.controller';
import { EstadoSeguimientoCambio } from './entities/estado_seguimiento_cambio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadoSeguimientoCambio]), 
  ],
  controllers: [EstadoSeguimientoCambioController],
  providers: [EstadoSeguimientoCambioService],
})
export class EstadoSeguimientoCambioModule {}
