import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto, RegisterDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        profile: { create: {} }, // tự tạo profile rỗng đi kèm
      },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // Cùng một thông báo cho cả 2 trường hợp sai
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}