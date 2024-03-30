import { Test, TestingModule } from '@nestjs/testing';
import { EstadoSeguimientoController } from './estado_seguimiento.controller';
import { EstadoSeguimientoService } from './estado_seguimiento.service';

describe('EstadoSeguimientoController', () => {
  let controller: EstadoSeguimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoSeguimientoController],
      providers: [EstadoSeguimientoService],
    }).compile();

    controller = module.get<EstadoSeguimientoController>(EstadoSeguimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
