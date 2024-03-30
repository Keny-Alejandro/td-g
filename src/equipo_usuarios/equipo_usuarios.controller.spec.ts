import { Test, TestingModule } from '@nestjs/testing';
import { EquipoUsuariosController } from './equipo_usuarios.controller';
import { EquipoUsuariosService } from './equipo_usuarios.service';

describe('EquipoUsuariosController', () => {
  let controller: EquipoUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoUsuariosController],
      providers: [EquipoUsuariosService],
    }).compile();

    controller = module.get<EquipoUsuariosController>(EquipoUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
