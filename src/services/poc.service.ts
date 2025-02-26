import { Injectable } from '@nestjs/common';
import * as AWSXRay from 'aws-xray-sdk';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Logger } from '../utils/logger-fmt'; // Importando o Logger
import { mapToAdviceDto } from '../mappers/advice.mapper';
import { ResponseTesteDTO } from '../dtos/response-teste.dto';

@Injectable()
export class PocService {
  constructor(private readonly logger: Logger) {} // Injetando o Logger

  // Método para gerar UUID e retornar um ResponseTesteDTO
  generateUUID(requestTesteDTO: any): ResponseTesteDTO {
    const id = uuidv4();
    return new ResponseTesteDTO(id, requestTesteDTO.descricao, requestTesteDTO.tipo);
  }

  // Método para buscar conselho de uma API externa
  async getAdviceService() {
    try {
      // const segment: any = AWSXRay.getSegment();
      // this.logger.info('## Log do segmento do X-Ray obtido dentro da service GET /advice', {
      //   requestId: segment?.id,
      //   traceId: segment?.trace_id,
      // });

      // Realizando a chamada HTTP para a API externa
      const response = await axios.get('https://api.adviceslip.com/advice');

      // Verificando se a resposta contém o dado esperado
      if (!response.data?.slip) {
        throw new Error(`Resposta inválida da API de conselho: ${JSON.stringify(response.data)}`);
      }

      // Mapeando os dados da resposta para o DTO
      const adviceDto = mapToAdviceDto(response.data);
      this.logger.info('Conselho obtido com sucesso', { advice: adviceDto.advice });

      return adviceDto;
    } catch (error) {
      this.logger.error('Erro ao buscar conselho', { // Usando o logger injetado
        message: error.message,
        status: error.response?.status || 'N/A',
        data: error.response?.data || 'N/A',
      });

      throw new Error('Erro ao obter o conselho');
    }
  }
}
