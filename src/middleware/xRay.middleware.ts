import * as AWSXRay from 'aws-xray-sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  private readonly segmentName: string

  constructor(segmentName: string){
    this.segmentName = segmentName;
  }

  use(req: Request, res: Response, next: NextFunction) {


    console.log(`Nome do segmento: ${this.segmentName}`)

    AWSXRay.express.openSegment('poc-coelho')(req, res, next);     

    res.on('finish', () => {
      const segment = AWSXRay.getSegment();
      segment?.close();
    });
  }
}