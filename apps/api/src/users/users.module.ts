import { DataService } from '@lifelog/data';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, DataService],
  exports: [],
})
export class UsersModule {}
