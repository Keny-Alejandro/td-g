import { Test, TestingModule } from '@nestjs/testing';
import { EquipoUsuariosService } from './equipo_usuarios.service';

describe('EquipoUsuariosService', () => {
  let service: EquipoUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoUsuariosService],
    }).compile();

    service = module.get<EquipoUsuariosService>(EquipoUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
