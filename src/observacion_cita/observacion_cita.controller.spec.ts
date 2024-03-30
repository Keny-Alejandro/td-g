import { Test, TestingModule } from '@nestjs/testing';
import { ObservacionCitaController } from './observacion_cita.controller';
import { ObservacionCitaService } from './observacion_cita.service';

describe('ObservacionCitaController', () => {
  let controller: ObservacionCitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservacionCitaController],
      providers: [ObservacionCitaService],
    }).compile();

    controller = module.get<ObservacionCitaController>(ObservacionCitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
