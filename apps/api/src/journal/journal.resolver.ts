import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JournalEntry } from '../@generated/prisma-nestjs-graphql/journal-entry/journal-entry.model';
import { JournalEntryUpdateInput } from '../@generated/prisma-nestjs-graphql/journal-entry/journal-entry-update.input';
import { PrismaClient } from '@prisma/client';
import { JournalEntryCreateInput } from '../@generated/prisma-nestjs-graphql/journal-entry/journal-entry-create.input';

@Resolver(() => JournalEntry)
export class JournalsResolver extends PrismaClient {
  constructor() {
    super();
  }

  /** @todo add another guard for user roles */
  @Query(() => [JournalEntry], { name: 'journalEntries' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.journalEntry.findMany();
  }

  /** @todo add another guard for user roles */
  // @Query(() => JournalEntry, { name: 'journalEntry' })
  // @UseGuards(JwtAuthGuard)
  // findOne(@Args('id') id: number) {
  //   // return this.dataService.findJournalByUserId(userId);
  // }

  @Mutation(() => JournalEntry)
  @UseGuards(JwtAuthGuard)
  createJournalEntry(
    @Args('journalEntry') journalEntry: JournalEntryCreateInput
  ) {
    return this.journalEntry.create({ data: journalEntry });
  }
}
