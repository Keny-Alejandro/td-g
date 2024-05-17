/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  console.log(process.env.POSTGRES_USER);
  const config = new DocumentBuilder()
    .setTitle('API para la Gestión Documental y Seguimiento Académico de Proyectos Pedagógicos Integradores (PPI)')
    .setDescription('La API de Gestión Documental y Seguimiento Académico de Proyectos Pedagógicos Integradores (PPI) del Politécnico Colombiano JIC proporciona un conjunto de endpoints diseñados para facilitar la administración y seguimiento de los PPIs en el contexto de la Técnica y Tecnología en Sistematización de Datos. Esta API permite a los usuarios acceder, crear, actualizar y eliminar información relacionada con los documentos, estudiantes, docentes y actividades académicas asociadas a los PPIs.')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
