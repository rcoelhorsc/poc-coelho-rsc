// import * as AWSXRay from 'aws-xray-sdk';
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class XRayMiddleware implements NestMiddleware {
//   private segmentName: string;

//   constructor(segmentName: string) {
//     this.segmentName = segmentName;
//   }
  
//   use(req: Request, res: Response, next: NextFunction) {

    
//     const ignoredRoutes = ['/health']; // Adicione as rotas que deseja ignorar
    
//     if (ignoredRoutes.includes(req.path)) {
//       return next(); // Ignora o X-Ray para estas rotas
//     }

//     const segment : any = AWSXRay.getSegment() || AWSXRay.express.openSegment(this.segmentName);

//     AWSXRay.middleware.enableDynamicNaming(); // Opcional

//     res.on('finish', () => {
//       if (segment) {
//         segment.close();
//       }
//     });

//     next();
//   }

//   static withSegmentName(segmentName: string) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       const middleware = new XRayMiddleware(segmentName);
//       middleware.use(req, res, next);
//     };
//   }
// }

import * as AWSXRay from 'aws-xray-sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  private segmentName: string;

  constructor(segmentName: string) {
    this.segmentName = segmentName;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const ignoredRoutes = ['/health', '/metrics'];

    if (ignoredRoutes.includes(req.path)) {
      return next();
    }

    const segment : any = AWSXRay.getSegment() || AWSXRay.express.openSegment(this.segmentName);

    res.on('finish', () => {
      if (segment) {
        segment.close();
      }
    });

    next();
  }
}
