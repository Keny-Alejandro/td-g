import { Test, TestingModule } from '@nestjs/testing';
import { TipoCitaService } from './tipo_cita.service';

describe('TipoCitaService', () => {
  let service: TipoCitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCitaService],
    }).compile();

    service = module.get<TipoCitaService>(TipoCitaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
