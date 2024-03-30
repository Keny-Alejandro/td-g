import { Test, TestingModule } from '@nestjs/testing';
import { EquipoPpiPjicController } from './equipo_ppi_pjic.controller';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';

describe('EquipoPpiPjicController', () => {
  let controller: EquipoPpiPjicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoPpiPjicController],
      providers: [EquipoPpiPjicService],
    }).compile();

    controller = module.get<EquipoPpiPjicController>(EquipoPpiPjicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
