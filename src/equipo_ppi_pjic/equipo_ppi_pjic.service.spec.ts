import { Test, TestingModule } from '@nestjs/testing';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';

describe('EquipoPpiPjicService', () => {
  let service: EquipoPpiPjicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoPpiPjicService],
    }).compile();

    service = module.get<EquipoPpiPjicService>(EquipoPpiPjicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
