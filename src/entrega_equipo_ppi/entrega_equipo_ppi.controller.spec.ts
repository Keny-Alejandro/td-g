import { Test, TestingModule } from '@nestjs/testing';
import { EntregaEquipoPpiController } from './entrega_equipo_ppi.controller';
import { EntregaEquipoPpiService } from './entrega_equipo_ppi.service';

describe('EntregaEquipoPpiController', () => {
  let controller: EntregaEquipoPpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregaEquipoPpiController],
      providers: [EntregaEquipoPpiService],
    }).compile();

    controller = module.get<EntregaEquipoPpiController>(EntregaEquipoPpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
