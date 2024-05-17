import { Module } from '@nestjs/common';
import { GoogleService } from './api.service';
import { GoogleController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Usuario])],
    controllers: [GoogleController],
    providers: [GoogleService]
})
export class GoogleModule {}
