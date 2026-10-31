import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'sum' })
  sum(@Payload() numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0);
  }
}