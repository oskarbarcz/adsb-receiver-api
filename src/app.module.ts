import { Module } from '@nestjs/common';
import { StatusController } from 'models/status/status.controller';
import { PositionModule } from './models/position/position.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [PositionModule, CacheModule.register({ isGlobal: true })],
  controllers: [StatusController],
})
export class AppModule {}
