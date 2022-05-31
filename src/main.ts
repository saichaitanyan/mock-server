import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { environmentConfig } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
    }),
  );
  // enable cors
  app.enableCors();
  // add prefix to endpoint
  app.setGlobalPrefix('/v1/api');
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Mock Server')
    .setDescription('All about mock data')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Server will run
  await app.listen(environmentConfig.port);
  Logger.log(`App is running at ${environmentConfig.port} port 🚀`);
}
bootstrap();
