import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder().setTitle('Omdb Review API').setDescription('Create your review for any movie').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
