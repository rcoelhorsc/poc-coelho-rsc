import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PocController } from './controllers/pocController';
import { PocService } from './services/poc.service';
import { Logger } from './utils/logger-fmt';
import { XRayMiddleware } from './middleware/xRay.middleware';
import { RequestStoreMiddleware } from './middleware/request-store.middleware';
import { RequestStoreService } from './middleware/request-store.service';


@Module({
  imports: [],
  controllers: [PocController],
  providers: [
    PocService,
    Logger,
    RequestStoreService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(XRayMiddleware, RequestStoreMiddleware)  // Aplicando o middleware, agora ele será injetado corretamente
      .exclude(
        { path: '/healthcheck', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
