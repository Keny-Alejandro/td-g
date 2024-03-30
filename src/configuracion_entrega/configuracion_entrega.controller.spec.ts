import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracionEntregaController } from './configuracion_entrega.controller';
import { ConfiguracionEntregaService } from './configuracion_entrega.service';

describe('ConfiguracionEntregaController', () => {
  let controller: ConfiguracionEntregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfiguracionEntregaController],
      providers: [ConfiguracionEntregaService],
    }).compile();

    controller = module.get<ConfiguracionEntregaController>(ConfiguracionEntregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
