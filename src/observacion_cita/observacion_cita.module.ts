import { Module } from '@nestjs/common';
import { ObservacionCitaService } from './observacion_cita.service';
import { ObservacionCitaController } from './observacion_cita.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservacionCita } from './entities/observacion_cita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObservacionCita]) 
  ],
  controllers: [ObservacionCitaController],
  providers: [ObservacionCitaService],
})
export class ObservacionCitaModule {}
