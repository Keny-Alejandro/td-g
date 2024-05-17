import { Module } from '@nestjs/common';
import { CitasAsesoriaPpiService } from './citas_asesoria_ppi.service';
import { CitasAsesoriaPpiController } from './citas_asesoria_ppi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasAsesoriaPpi } from './entities/citas_asesoria_ppi.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CitasAsesoriaPpi])],
  controllers: [CitasAsesoriaPpiController],
  providers: [CitasAsesoriaPpiService],
})
export class CitasAsesoriaPpiModule {}
