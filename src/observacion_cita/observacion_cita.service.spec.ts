import { Test, TestingModule } from '@nestjs/testing';
import { ObservacionCitaService } from './observacion_cita.service';

describe('ObservacionCitaService', () => {
  let service: ObservacionCitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservacionCitaService],
    }).compile();

    service = module.get<ObservacionCitaService>(ObservacionCitaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
