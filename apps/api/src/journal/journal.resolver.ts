import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JournalEntry } from '../@generated/prisma-nestjs-graphql/journal-entry/journal-entry.model';
import { PrismaClient } from '@prisma/client';
import { JournalEntryCreateInput } from '../@generated/prisma-nestjs-graphql/journal-entry/journal-entry-create.input';
import { JournalEntryUpdateInput } from './dto/journal-entry-update.input';

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

  @Mutation(() => JournalEntry)
  @UseGuards(JwtAuthGuard)
  updateJournalEntry(
    @Args('updateJournalEntry')
    updateJournalEntry: JournalEntryUpdateInput
  ) {
    return this.journalEntry.update({
      data: updateJournalEntry,
      where: { id: updateJournalEntry.id as number },
    });
  }
}
