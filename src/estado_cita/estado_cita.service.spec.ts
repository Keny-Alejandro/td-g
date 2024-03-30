import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCitaService } from './estado_cita.service';

describe('EstadoCitaService', () => {
  let service: EstadoCitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoCitaService],
    }).compile();

    service = module.get<EstadoCitaService>(EstadoCitaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
