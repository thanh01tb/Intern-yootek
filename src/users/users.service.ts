import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { UpdateUserDto } from './dto/user.dto.js';

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  profile: true,
  posts: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      select: userSelect,
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);
    const { bio, avatar, ...userData } = dto;
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...userData, // name, email
          profile: {
            upsert: {
              create: { bio, avatar },
              update: { bio, avatar },
            },
          },
        },
        select: userSelect,
      });
    } catch (e) {
      this.handleError(e);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: `User ${id} deleted` };
  }

  private handleError(e: unknown): never {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      throw new ConflictException('Email already exists');
    }
    throw e;
  }
}