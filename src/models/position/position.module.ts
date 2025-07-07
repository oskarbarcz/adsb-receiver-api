import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionStore } from '../../providers/store/position.store';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PositionController],
  providers: [PositionStore],
})
export class PositionModule {}
