import * as AWSXRay from 'aws-xray-sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    AWSXRay.express.openSegment('poc-coelho')(req, res, next);     

    res.on('finish', () => {
      const segment = AWSXRay.getSegment();
      segment?.close();
    });
  }
}