import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { RequestStoreService } from '../middleware/request-store.service';

@Injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    // Definindo o formato customizado do log
    const logfmtFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {

      const requestId = RequestStoreService.get<string>('requestId');
      const traceId = RequestStoreService.get<string>('traceId');
      const xamzn = RequestStoreService.get<string>('xamzn');

      let log = `time=${timestamp} severity=${level} requestId=${requestId} traceId=${traceId} xamzn=${xamzn} message="${message}" `;
      
      // Adicionando outros metadados ao log
      for (const key in meta) {
        if (meta.hasOwnProperty(key)) {
          log += ` ${key}="${meta[key]}"`;
        }
      }

      return log;
    });

    // Configuração do logger do winston
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        logfmtFormat
      ),
      transports: [
        new winston.transports.Console(),
        // Aqui você pode descomentar a linha abaixo para adicionar um arquivo de log
        // new winston.transports.File({ filename: 'path/to/logs/app.json' }),
      ]
    });
  }

  info(message: string, meta: Record<string, any> = {}) {
    this.logger.info(message, meta);
  }

  error(message: string, meta: Record<string, any> = {}) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta: Record<string, any> = {}) {
    this.logger.warn(message, meta);
  }

  // Você pode adicionar mais métodos como debug, etc, conforme necessário
}
