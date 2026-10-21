import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, data: { title: string; content?: string }) {
    return this.prisma.post.create({ data: { ...data, userId } });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    return post;
  }

  async update(id: number, data: { title?: string; content?: string }) {
    await this.findOne(id);
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.post.delete({ where: { id } });
    return { message: `Post ${id} deleted` };
  }
}