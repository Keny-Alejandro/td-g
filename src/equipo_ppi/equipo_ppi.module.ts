import { Module } from '@nestjs/common';
import { EquipoPpiService } from './equipo_ppi.service';
import { EquipoPpiController } from './equipo_ppi.controller';

@Module({
  controllers: [EquipoPpiController],
  providers: [EquipoPpiService],
})
export class EquipoPpiModule {}
