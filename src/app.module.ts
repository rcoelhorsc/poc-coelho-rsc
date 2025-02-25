import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PocController } from './controllers/pocController';
import { PocService } from './services/poc.service';
import { Logger } from './utils/logger-fmt';
import { XRayMiddleware } from './middleware/xRayIgnore.middleware'
@Module({
  imports: [],
  controllers: [PocController],
  providers: [PocService, Logger],
})

// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(XRayMiddleware.withSegmentName('poc-coelho'))
//       .forRoutes('*');
//   }
// }

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(XRayMiddleware.bind(null, 'poc-coelho')) // Passa o nome do segmento diretamente
      .forRoutes('*');
  }
}