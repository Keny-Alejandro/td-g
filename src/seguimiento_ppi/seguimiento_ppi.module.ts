import { Module } from '@nestjs/common';
import { SeguimientoPpiService } from './seguimiento_ppi.service';
import { SeguimientoPpiController } from './seguimiento_ppi.controller';
import { SeguimientoPpi } from './entities/seguimiento_ppi.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { EstadoSeguimiento } from 'src/estado_seguimiento/entities/estado_seguimiento.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeguimientoPpi]), 
    TypeOrmModule.forFeature([EquipoUsuario]),
    TypeOrmModule.forFeature([EstadoSeguimientoCambio]), 
    TypeOrmModule.forFeature([EstadoSeguimiento]),  
    TypeOrmModule.forFeature([CitasAsesoriaPpi]), 
  ],
  controllers: [SeguimientoPpiController],
  providers: [SeguimientoPpiService],
})
export class SeguimientoPpiModule {}
