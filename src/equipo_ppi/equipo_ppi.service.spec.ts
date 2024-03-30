import { Test, TestingModule } from '@nestjs/testing';
import { EquipoPpiService } from './equipo_ppi.service';

describe('EquipoPpiService', () => {
  let service: EquipoPpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoPpiService],
    }).compile();

    service = module.get<EquipoPpiService>(EquipoPpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
