import { Module } from '@nestjs/common';
import { ObservacionCitaService } from './observacion_cita.service';
import { ObservacionCitaController } from './observacion_cita.controller';

@Module({
  controllers: [ObservacionCitaController],
  providers: [ObservacionCitaService],
})
export class ObservacionCitaModule {}
