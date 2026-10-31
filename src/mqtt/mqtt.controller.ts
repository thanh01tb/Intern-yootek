import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SENSOR_TOPIC } from './mqtt.constants.js';
import { SensorDataDto } from './dto/sensor-data.dto.js';
import { EventsGateway } from '../events/events.gateway.js';

@Controller()
export class MqttController {
  private readonly logger = new Logger(MqttController.name);

  constructor(private readonly events: EventsGateway) {}

  @EventPattern(SENSOR_TOPIC)
  handleSensor(@Payload() data: SensorDataDto) {
    this.logger.log(`[${SENSOR_TOPIC}] ${JSON.stringify(data)}`);
    this.events.broadcast('sensor', data);
  }
}