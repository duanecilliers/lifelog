import { DataService } from '@lifelog/data';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersResolver } from './users.resolver';
import { ProfilesResolver } from './profiles.resolver';

@Module({
  providers: [UsersResolver, ProfilesResolver, DataService, ConfigService],
  exports: [],
})
export class UsersModule {}
