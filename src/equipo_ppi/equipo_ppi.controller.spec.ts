import { Test, TestingModule } from '@nestjs/testing';
import { EquipoPpiController } from './equipo_ppi.controller';
import { EquipoPpiService } from './equipo_ppi.service';

describe('EquipoPpiController', () => {
  let controller: EquipoPpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoPpiController],
      providers: [EquipoPpiService],
    }).compile();

    controller = module.get<EquipoPpiController>(EquipoPpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
