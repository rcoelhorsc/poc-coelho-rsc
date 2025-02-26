import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestStoreService } from './request-store.service';
import * as AWSXRay from 'aws-xray-sdk';

export class RequestStoreMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const segment: any = AWSXRay.getSegment();
    const store = new Map<string, any>();
    const requestId = req.get('request_id')
    const xamz = req.get('x-amzn-apigateway-api-id')

    console.log(`requestId obtido no RequestStoreMiddleware: ${requestId}`)
    console.log(`xamz obtido no RequestStoreMiddleware: ${xamz}`)

    store.set('requestId', requestId);
    store.set('traceId', segment.trace_id);
    store.set('xamzn', xamz);

    RequestStoreService.run(store, () => {
      process.nextTick(next);
    });
  }
}