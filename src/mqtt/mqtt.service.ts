import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { COMMAND_TOPIC } from './mqtt.constants.js';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);
  private client: MqttClient;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.client = connect(this.config.get<string>('MQTT_URL')!);
    this.client.on('connect', () => this.logger.log('MQTT publisher đã kết nối broker'));
    this.client.on('error', (err) => this.logger.error(err.message));
  }

  onModuleDestroy() {
    this.client?.end();
  }

  publishCommand(payload: Record<string, unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(COMMAND_TOPIC, JSON.stringify(payload), { qos: 0 }, (err) =>
        err ? reject(err) : resolve(),
      );
    });
  }
}