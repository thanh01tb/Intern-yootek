import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('math')
export class MathController {
  constructor(@Inject('MATH_SERVICE') private readonly mathClient: ClientProxy) {}

  @Get('sum')
  sum() {
    return this.mathClient.send({ cmd: 'sum' }, [1, 2, 3]);
  }
}