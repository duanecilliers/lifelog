import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DataService } from '@lifelog/data';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly dataService: DataService) {}

  /** @todo add another guard for user roles */
  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.dataService.allUsers();
  }

  /** @todo add another guard for user roles */
  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('email') email: string) {
    return this.dataService.findUserByEmail(email);
  }
}
