import { ApiProperty } from '@nestjs/swagger';

export class SensorDataDto {
  @ApiProperty({ example: 11 }) id: number;
  @ApiProperty({ example: 126 }) packet_no: number;
  @ApiProperty({ example: 30 }) temperature: number;
  @ApiProperty({ example: 60 }) humidity: number;
  @ApiProperty({ example: 1100 }) tds: number;
  @ApiProperty({ example: 5.0 }) pH: number;
}