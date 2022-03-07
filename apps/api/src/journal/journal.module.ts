import { Module } from '@nestjs/common';
import { JournalsResolver } from './journal.resolver';

@Module({
  providers: [JournalsResolver],
})
export class JournalModule {}
