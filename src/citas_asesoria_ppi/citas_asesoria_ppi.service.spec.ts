import { Test, TestingModule } from '@nestjs/testing';
import { CitasAsesoriaPpiService } from './citas_asesoria_ppi.service';

describe('CitasAsesoriaPpiService', () => {
  let service: CitasAsesoriaPpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitasAsesoriaPpiService],
    }).compile();

    service = module.get<CitasAsesoriaPpiService>(CitasAsesoriaPpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
