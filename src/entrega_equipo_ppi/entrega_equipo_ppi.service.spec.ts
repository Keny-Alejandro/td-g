import { Test, TestingModule } from '@nestjs/testing';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';

describe('EntregaEquipoPpiService', () => {
  let service: EntregaEquipoPpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntregaEquipoPpiService],
    }).compile();

    service = module.get<EntregaEquipoPpiService>(EntregaEquipoPpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
