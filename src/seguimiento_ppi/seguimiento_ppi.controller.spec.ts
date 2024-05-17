import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientoPpiController } from './seguimiento_ppi.controller';
import { SeguimientoPpiService } from './seguimiento_ppi.service';

describe('SeguimientoPpiController', () => {
  let controller: SeguimientoPpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguimientoPpiController],
      providers: [SeguimientoPpiService],
    }).compile();

    controller = module.get<SeguimientoPpiController>(SeguimientoPpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
