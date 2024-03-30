import { Test, TestingModule } from '@nestjs/testing';
import { TipoEntregaController } from './tipo_entrega.controller';
import { TipoEntregaService } from './tipo_entrega.service';

describe('TipoEntregaController', () => {
  let controller: TipoEntregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoEntregaController],
      providers: [TipoEntregaService],
    }).compile();

    controller = module.get<TipoEntregaController>(TipoEntregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
