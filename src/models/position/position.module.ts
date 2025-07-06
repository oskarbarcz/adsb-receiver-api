import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionStore } from '../../providers/store/position.store';

@Module({
  imports: [],
  controllers: [PositionController],
  providers: [PositionStore],
})
export class PositionModule {}
