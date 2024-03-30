import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientoPpiService } from './seguimiento_ppi.service';

describe('SeguimientoPpiService', () => {
  let service: SeguimientoPpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguimientoPpiService],
    }).compile();

    service = module.get<SeguimientoPpiService>(SeguimientoPpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
