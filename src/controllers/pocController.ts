import { Controller, Get, Req, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
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
  getHealth(@Req() req: Request, @Res() res: Response) {
    this.logger.info('## Log do segmento do X-Ray obtido dentro da rota GET /healthcheck');

    return res.status(HttpStatus.OK).send('Healthy!');
  }

  // Rota: "GET /teste"
  @Get('teste')
  getTeste(@Req() req: Request, @Res() res: Response) {
    const requestId = req.get('request_id');
    // const segment: any = AWSXRay.getSegment();  

    console.log(`## GET /teste - request_id: ${requestId}`);
    this.logger.info('## Log do segmento do X-Ray obtido dentro da rota GET /teste');

    return res.json({ message: 'Teste POC Coelho!!!', requestId });
  }

  // Rota: "POST /teste"
  @Post('teste')
  postTeste(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    try {
      this.logger.info('## Log do segmento do X-Ray obtido dentro da rota POST /teste');
      
      const requestTesteDTO = RequestTesteDTO.fromJson(body);
      const responseTesteDTO = this.pocService.generateUUID(requestTesteDTO);
      return res.json(responseTesteDTO.toJson());
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  // Rota: "GET /advice"
  @Get('advice')
  async getAdvice(@Req() req: Request,@Res() res: Response) {
    try {
      this.logger.info('## Log do segmento do X-Ray obtido dentro da rotas GET /advice');

      const data = await this.pocService.getAdviceService();
      return res.json({ data });

      // return res.json({ message: 'Teste ADVICE Coelho!!!' });
    } catch (error) {
      this.logger.error('Erro ao processar a requisição de conselho', { error: error.message });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao obter o conselho' });
    }
  }
}
