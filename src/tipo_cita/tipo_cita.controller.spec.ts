import { Test, TestingModule } from '@nestjs/testing';
import { TipoCitaController } from './tipo_cita.controller';
import { TipoCitaService } from './tipo_cita.service';

describe('TipoCitaController', () => {
  let controller: TipoCitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCitaController],
      providers: [TipoCitaService],
    }).compile();

    controller = module.get<TipoCitaController>(TipoCitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
