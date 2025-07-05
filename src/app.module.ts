import { Module } from '@nestjs/common';
import { StatusController } from 'models/status/status.controller';

@Module({
  imports: [],
  controllers: [StatusController],
})
export class AppModule {}
