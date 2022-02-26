import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataService } from './data.service';

@Module({
  controllers: [],
  providers: [DataService, ConfigService],
  exports: [],
})
export class DataModule {}
