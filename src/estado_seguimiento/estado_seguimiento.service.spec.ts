import { Test, TestingModule } from '@nestjs/testing';
import { EstadoSeguimientoService } from './estado_seguimiento.service';

describe('EstadoSeguimientoService', () => {
  let service: EstadoSeguimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoSeguimientoService],
    }).compile();

    service = module.get<EstadoSeguimientoService>(EstadoSeguimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
