import { DataService } from '@lifelog/data';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, DataService, ConfigService],
  exports: [],
})
export class UsersModule {}
