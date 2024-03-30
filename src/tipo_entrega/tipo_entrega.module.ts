import { Module } from '@nestjs/common';
import { TipoEntregaService } from './tipo_entrega.service';
import { TipoEntregaController } from './tipo_entrega.controller';

@Module({
  controllers: [TipoEntregaController],
  providers: [TipoEntregaService],
})
export class TipoEntregaModule {}
