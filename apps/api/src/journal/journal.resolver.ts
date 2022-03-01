import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DataService } from '@lifelog/data';

@Resolver(() => Journal)
export class JournalsResolver {
  constructor(private readonly dataService: DataService) {}

  /** @todo add another guard for user roles */
  @Query(() => [Journal], { name: 'profiles' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.dataService.allJournals();
  }

  /** @todo add another guard for user roles */
  @Query(() => Journal, { name: 'profile' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('userId') userId: number) {
    return this.dataService.findJournalByUserId(userId);
  }

  @Mutation(() => Journal)
  @UseGuards(JwtAuthGuard)
  updateJournal(@Args('profile') profile: UpdateJournalInput) {
    return this.dataService.updateJournal(profile);
  }
}
