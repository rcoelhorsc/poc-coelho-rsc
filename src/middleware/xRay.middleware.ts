import * as https from 'https';
import * as AWSXRay from 'aws-xray-sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

      AWSXRay.captureHTTPsGlobal(https);

      // const ignoredRoutes = [
      //   /\/teste/,
      //   /\/healthcheck/  // "/healthcheck" ou qualquer coisa começando com "/healthcheck"
      // ];

      // if (ignoredRoutes.some(route => route.test(req.originalUrl))) {
      //   // Se a rota for ignorada, não cria o segmento
      //   return next();
      // }      

      // var rules = {
      //   "rules":[
      //               { "description": "Ignore health check", "service_name": "*", "http_method": "GET", "url_path": "/poc-coelho/healthcheck", "fixed_target": 0, "rate": 0.00 },
      //               { "description": "Ignore teste", "service_name": "*", "http_method": "GET", "url_path": "/poc-coelho/teste*", "fixed_target": 0, "rate": 0.00 }
      //           ],
      //   "default": { "fixed_target": 1, "rate": 0.1 },
      //   "version": 1
      // };
      
      // console.log(req.originalUrl);

      // AWSXRay.middleware.setSamplingRules(rules);    


    const segment : any= AWSXRay.express.openSegment('poc-coelho')(req, res, next);  
    //next();

    res.on('finish', () => {
      //const segment = AWSXRay.getSegment();
      segment?.close();
    });
  }
}