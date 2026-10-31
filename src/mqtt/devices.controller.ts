import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MqttService } from './mqtt.service.js';
import { CommandDto } from './dto/command.dto.js';
import { COMMAND_TOPIC } from './mqtt.constants.js';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly mqtt: MqttService) {}

  @Post('command')
  @ApiBody({ type: CommandDto })
  async sendCommand(@Body() dto: CommandDto) {
    await this.mqtt.publishCommand({ ...dto });
    return { sent: true, topic: COMMAND_TOPIC, payload: dto };
  }
}