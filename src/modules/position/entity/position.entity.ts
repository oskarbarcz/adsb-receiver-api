import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class Position {
  @ApiProperty({
    description: 'The date and time of the position record',
    example: '2023-01-01T12:00:00Z',
  })
  date: string;

  @ApiProperty({
    description: 'The longitude of the position',
    example: -74.006,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'The latitude of the position',
    example: 40.7128,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'The callsign of the aircraft',
    example: 'DLH1234',
  })
  @IsString()
  @IsNotEmpty()
  callsign: string;
}
