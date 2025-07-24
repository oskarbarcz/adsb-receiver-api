import { OmitType } from '@nestjs/swagger';
import { Position } from '../entity/position.entity';

export class CreatePositionRequest extends OmitType(Position, ['date']) {}
export class CreatePositionResponse extends Position {}
