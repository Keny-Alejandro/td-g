import { Test, TestingModule } from '@nestjs/testing';
import { SemanasController } from './semanas.controller';
import { SemanasService } from './semanas.service';

describe('SemanasController', () => {
  let controller: SemanasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemanasController],
      providers: [SemanasService],
    }).compile();

    controller = module.get<SemanasController>(SemanasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
