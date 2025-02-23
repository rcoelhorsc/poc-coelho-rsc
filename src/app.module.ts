import { Module } from '@nestjs/common';
import { PocController } from './controllers/pocController';
import { PocService } from './services/poc.service';
import { Logger } from './utils/logger-fmt';

@Module({
  imports: [],
  controllers: [PocController],
  providers: [PocService, Logger],
})
export class AppModule {}
