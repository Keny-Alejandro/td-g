import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioCalificacionService } from './usuario_calificacion.service';

describe('UsuarioCalificacionService', () => {
  let service: UsuarioCalificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioCalificacionService],
    }).compile();

    service = module.get<UsuarioCalificacionService>(UsuarioCalificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
