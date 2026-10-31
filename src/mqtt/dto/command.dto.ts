import { ApiProperty } from '@nestjs/swagger';

export class CommandDto {
  @ApiProperty({ example: 'led' }) command: string;
  @ApiProperty({ example: 'on' }) value: string;
}