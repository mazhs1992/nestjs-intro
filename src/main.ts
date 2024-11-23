import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJs - Blog API')
    .setDescription(
      'Use the base URL to access the API - http://localhost:3000/api',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  // instantiate Documet
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.error(`NODE_ENV: ${process.env.NODE_ENV}`);

  await app.listen(3000);
}
bootstrap();
