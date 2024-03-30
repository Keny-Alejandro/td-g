import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCitaController } from './estado_cita.controller';
import { EstadoCitaService } from './estado_cita.service';

describe('EstadoCitaController', () => {
  let controller: EstadoCitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoCitaController],
      providers: [EstadoCitaService],
    }).compile();

    controller = module.get<EstadoCitaController>(EstadoCitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
