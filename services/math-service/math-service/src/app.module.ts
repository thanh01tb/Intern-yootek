import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClientsModule } from '@nestjs/microservices/module/clients.module.js';
import { Transport } from '@nestjs/microservices/enums/transport.enum.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'math-service',
    }),
    ClientsModule.register([
      { 
        name: 'MATH_SERVICE', 
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4001 } 
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
