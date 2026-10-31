import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MQTT_CLIENT } from './mqtt.constants.js';
import { MqttController } from './mqtt.controller.js';
import { DevicesController } from './devices.controller.js';
import { MqttService } from './mqtt.service.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [
    EventsModule,
    ClientsModule.registerAsync([
      {
        name: MQTT_CLIENT,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: config.get<string>('MQTT_URL'),
            serializer: { serialize: (packet: any) => packet.data },
          },
        }),
      },
    ]),
  ],
  controllers: [MqttController, DevicesController],
  providers: [MqttService],
})
export class MqttModule {}