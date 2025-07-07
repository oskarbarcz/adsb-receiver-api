import { Module } from '@nestjs/common';
import { StatusController } from 'models/status/status.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './models/auth/auth.module';
import { PositionModule } from './models/position/position.module';

@Module({
  imports: [
    PositionModule,
    AuthModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [StatusController],
})
export class AppModule {}
