import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as AWSXRay from 'aws-xray-sdk';
import { PocService } from '../services/poc.service';
import { RequestTesteDTO } from '../dtos/request-teste.dto';
import { Logger } from '../utils/logger-fmt'; // Importando o Logger

@Controller() // Não é mais necessário colocar 'poc' aqui, porque o prefixo será aplicado globalmente
export class PocController {
  constructor(
    private readonly pocService: PocService,
    private readonly logger: Logger // Injetando o Logger
  ) {}

  // Rota: "GET /healthcheck"
  @Get('healthcheck')
  getHealth(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('Healthy!');
  }

  // Rota: "GET /teste"
  @Get('teste')
  getTeste(@Res() res: Response) {
    const segment: any = AWSXRay.getSegment();
    this.logger.info('## Log do segmento do X-Ray obtido dentro da rota GET /teste', {
      requestId: segment?.id,
      traceId: segment?.trace_id,
    });

    return res.json({ message: 'Teste POC Coelho!!!' });
  }

  // Rota: "POST /teste"
  @Post('teste')
  postTeste(@Body() body: any, @Res() res: Response) {
    try {
      const requestTesteDTO = RequestTesteDTO.fromJson(body);
      const responseTesteDTO = this.pocService.generateUUID(requestTesteDTO);
      return res.json(responseTesteDTO.toJson());
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  // Rota: "GET /advice"
  @Get('advice')
  async getAdvice(@Res() res: Response) {
    try {
      const segment: any = AWSXRay.getSegment();
      this.logger.info('## Log do segmento do X-Ray obtido dentro da rota GET /advice', {
        requestId: segment?.id,
        traceId: segment?.trace_id,
      });

      const data = await this.pocService.getAdviceService();
      return res.json({ data });
    } catch (error) {
      this.logger.error('Erro ao processar a requisição de conselho', { error: error.message });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao obter o conselho' });
    }
  }
}
