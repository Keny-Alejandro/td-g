import { Test, TestingModule } from '@nestjs/testing';
import { HoraSemanalService } from './hora_semanal.service';

describe('HoraSemanalService', () => {
  let service: HoraSemanalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoraSemanalService],
    }).compile();

    service = module.get<HoraSemanalService>(HoraSemanalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
