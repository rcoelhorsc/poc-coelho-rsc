import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestStoreService } from './request-store.service';
import * as AWSXRay from 'aws-xray-sdk';

export class RequestStoreMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const segment: any = AWSXRay.getSegment();
    const store = new Map<string, any>();
    const requestId = req.get('request_id')

    store.set('requestId', requestId);
    store.set('traceId', segment.trace_id);

    RequestStoreService.run(store, () => {
      process.nextTick(next);
    });
  }
}