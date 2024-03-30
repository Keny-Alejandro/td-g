import { Module } from '@nestjs/common';
import { CitasAsesoriaPpiService } from './citas_asesoria_ppi.service';
import { CitasAsesoriaPpiController } from './citas_asesoria_ppi.controller';

@Module({
  controllers: [CitasAsesoriaPpiController],
  providers: [CitasAsesoriaPpiService],
})
export class CitasAsesoriaPpiModule {}
