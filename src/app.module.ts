import { Module } from '@nestjs/common';
import { StatusController } from 'modules/status/status.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';
import { PositionModule } from './modules/position/position.module';

@Module({
  imports: [
    PositionModule,
    AuthModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [StatusController],
})
export class AppModule {}
