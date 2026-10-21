import type { Request } from 'express';

export interface JwtPayload {
  sub: number;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthUser {
  userId: number;
  email: string;
  role: 'USER' | 'ADMIN';
}

export type RequestWithUser = Request & { user: AuthUser };