import { Module } from '@nestjs/common';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';
import { EntregaEquipoPpiController } from './entrega_equipo_ppi.controller';

@Module({
  controllers: [EntregaEquipoPpiController],
  providers: [EntregaEquipoPpiService],
})
export class EntregaEquipoPpiModule {}
