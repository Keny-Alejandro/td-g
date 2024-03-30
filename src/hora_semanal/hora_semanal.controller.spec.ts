import { Test, TestingModule } from '@nestjs/testing';
import { HoraSemanalController } from './hora_semanal.controller';
import { HoraSemanalService } from './hora_semanal.service';

describe('HoraSemanalController', () => {
  let controller: HoraSemanalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoraSemanalController],
      providers: [HoraSemanalService],
    }).compile();

    controller = module.get<HoraSemanalController>(HoraSemanalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
