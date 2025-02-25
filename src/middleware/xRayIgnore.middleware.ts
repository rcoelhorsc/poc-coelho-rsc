import * as AWSXRay from 'aws-xray-sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ignoredRoutes = ['/health']; // Adicione as rotas que deseja ignorar
    
    if (ignoredRoutes.includes(req.path)) {
      return next(); // Ignora o X-Ray para estas rotas
    }

    const segment = AWSXRay.getSegment();
    AWSXRay.middleware.enableDynamicNaming(); // Opcional

    res.on('finish', () => {
      if (segment) {
        segment.close();
      }
    });

    next();
  }
}
