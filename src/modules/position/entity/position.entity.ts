import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class Position {
  @ApiProperty({
    description: 'The date and time of the position record',
    example: '2023-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
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

  @ApiProperty({
    description: 'The vertical rate of the aircraft in fpm (feet per minute)',
    example: 1500,
    required: false,
  })
  @IsOptional()
  verticalRate?: number;

  @ApiProperty({
    description: 'The squawk code of the aircraft (4 digits, each 0-7)',
    example: '1234',
    required: false,
  })
  @IsString()
  @Matches(/^[0-7]{4}$/, {
    message: 'Squawk must be exactly 4 digits, each from 0 to 7',
  })
  @IsOptional()
  squawk: string;

  @ApiProperty({
    description: 'The ground speed of the aircraft in knots',
    example: 250,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  groundSpeed: number;

  @ApiProperty({
    description: 'The track angle of the aircraft in degrees',
    example: 180,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  track: number;

  @ApiProperty({
    description: 'Indicates if the aircraft is alerting',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  alert: boolean;

  @ApiProperty({
    description: 'Indicates if the aircraft is in an emergency state',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  emergency: boolean;

  @ApiProperty({
    description:
      'Indicates if the aircraft has special position identification (IDENT)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  spi: boolean;

  @ApiProperty({
    description: 'Indicates if the aircraft is on the ground',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isOnGround: boolean;

  @ApiProperty({
    description: 'Aircraft altitude in feet',
    example: 29000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  altitude: number;
}
