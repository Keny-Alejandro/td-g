import { Module } from '@nestjs/common';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';
import { EquipoPpiPjicController } from './equipo_ppi_pjic.controller';

@Module({
  controllers: [EquipoPpiPjicController],
  providers: [EquipoPpiPjicService],
})
export class EquipoPpiPjicModule {}
