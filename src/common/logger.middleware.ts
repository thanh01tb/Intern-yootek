import { Injectable, InternalServerErrorException, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      this.logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - start}ms`,
      );
    });
    next();
  }
}

@Injectable()
export class EnvCheckMiddleware implements NestMiddleware {
    constructor( private config: ConfigService) {}
    use(req: any, res:any , next: () => void){
      if(!this.config.get('JWT_SECRET') || !this.config.get('DATABASE_URL')){
          throw new InternalServerErrorException('Server chưa cấu hình đủ biến môi trường');
      }
      next() ;
  }
}