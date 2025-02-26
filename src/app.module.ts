import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PocController } from './controllers/pocController';
import { PocService } from './services/poc.service';
import { Logger } from './utils/logger-fmt';
import { XRayMiddleware } from './middleware/xRay.middleware';

@Module({
  imports: [],
  controllers: [PocController],
  providers: [
    PocService,
    Logger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(XRayMiddleware)  // Aplicando o middleware, agora ele será injetado corretamente
      .exclude(
        { path: 'healthcheck', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
