import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto.js';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];   
  private nextId = 1;          

  create(dto: CreateUserDto): User {
    const user: User = { id: this.nextId++, ...dto };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id);   
    Object.assign(user, dto);       
    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
    return { message: `User ${user.id} deleted` };
  }
}