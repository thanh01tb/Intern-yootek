import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards,
} from '@nestjs/common';
import { Role } from '../generated/prisma/client.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { PostsService } from './posts.service.js';
import type { RequestWithUser } from '../auth/jwt-payload.js';

@UseGuards(JwtAuthGuard, RolesGuard) // xác thực trước, phân quyền sau
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  create(
  @Req() req: RequestWithUser,
  @Body() body: { title: string; content?: string },
  ){
    return this.postsService.create(req.user.userId, body);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  findAll(){
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}