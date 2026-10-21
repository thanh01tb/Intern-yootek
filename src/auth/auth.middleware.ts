import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { NextFunction, Request, Response } from 'express';

// Nội dung bên trong token (payload) mà lúc login ta đã ký vào
export interface JwtPayload {
  sub: number;
  email: string;
  role: 'USER' | 'ADMIN';
}

// Request thường + thêm trường user
export type RequestWithUser = Request & { user?: JwtPayload };

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  async use(req: RequestWithUser, _res: Response, next: NextFunction) {
    const header = req.headers.authorization; // "Bearer xxxxx"
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new UnauthorizedException('Missing token');

    try {
      req.user = await this.jwt.verifyAsync<JwtPayload>(token);
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}