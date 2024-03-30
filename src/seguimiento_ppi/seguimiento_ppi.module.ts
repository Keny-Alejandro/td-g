import { Module } from '@nestjs/common';
import { SeguimientoPpiService } from './seguimiento_ppi.service';
import { SeguimientoPpiController } from './seguimiento_ppi.controller';

@Module({
  controllers: [SeguimientoPpiController],
  providers: [SeguimientoPpiService],
})
export class SeguimientoPpiModule {}
