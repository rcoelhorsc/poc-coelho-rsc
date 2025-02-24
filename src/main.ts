import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AWSXRay from 'aws-xray-sdk';
import * as http from 'http';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  AWSXRay.captureHTTPsGlobal(http);
  AWSXRay.captureHTTPsGlobal(https);
  app.use(AWSXRay.express.openSegment('poc-coelho'));

  // Define o prefixo global de todas as rotas
  app.setGlobalPrefix('poc-coelho');

  await app.listen(process.env.PORT ?? 3000);

  app.use(AWSXRay.express.closeSegment());   
}
bootstrap();
