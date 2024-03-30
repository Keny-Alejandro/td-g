import { Test, TestingModule } from '@nestjs/testing';
import { EstadoSeguimientoCambioService } from './estado_seguimiento_cambio.service';

describe('EstadoSeguimientoCambioService', () => {
  let service: EstadoSeguimientoCambioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoSeguimientoCambioService],
    }).compile();

    service = module.get<EstadoSeguimientoCambioService>(EstadoSeguimientoCambioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
