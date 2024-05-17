import { Test, TestingModule } from '@nestjs/testing';
import { SemanasService } from './semanas.service';

describe('SemanasService', () => {
  let service: SemanasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemanasService],
    }).compile();

    service = module.get<SemanasService>(SemanasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
