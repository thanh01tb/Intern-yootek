// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UsersService } from './users/users.service.js';
import { CreateUserDto, UpdateUserDto } from './users/dto/user.dto.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathController } from './math.controller.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} 
  
  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }
}