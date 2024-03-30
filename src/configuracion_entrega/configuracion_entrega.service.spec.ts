import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';

describe('ConfiguracionEntregaService', () => {
  let service: ConfiguracionEntregaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfiguracionEntregaService],
    }).compile();

    service = module.get<ConfiguracionEntregaService>(ConfiguracionEntregaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
