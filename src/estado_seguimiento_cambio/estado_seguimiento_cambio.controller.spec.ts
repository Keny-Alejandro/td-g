import { Test, TestingModule } from '@nestjs/testing';
import { EstadoSeguimientoCambioController } from './estado_seguimiento_cambio.controller';
import { EstadoSeguimientoCambioService } from './estado_seguimiento_cambio.service';

describe('EstadoSeguimientoCambioController', () => {
  let controller: EstadoSeguimientoCambioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoSeguimientoCambioController],
      providers: [EstadoSeguimientoCambioService],
    }).compile();

    controller = module.get<EstadoSeguimientoCambioController>(EstadoSeguimientoCambioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
