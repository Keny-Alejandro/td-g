import { Test, TestingModule } from '@nestjs/testing';
import { CitasAsesoriaPpiController } from './citas_asesoria_ppi.controller';
import { CitasAsesoriaPpiService } from './citas_asesoria_ppi.service';

describe('CitasAsesoriaPpiController', () => {
  let controller: CitasAsesoriaPpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitasAsesoriaPpiController],
      providers: [CitasAsesoriaPpiService],
    }).compile();

    controller = module.get<CitasAsesoriaPpiController>(CitasAsesoriaPpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
