import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioCalificacionController } from './usuario_calificacion.controller';
import { UsuarioCalificacionService } from './usuario_calificacion.service';

describe('UsuarioCalificacionController', () => {
  let controller: UsuarioCalificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioCalificacionController],
      providers: [UsuarioCalificacionService],
    }).compile();

    controller = module.get<UsuarioCalificacionController>(UsuarioCalificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
