import { Field, InputType, Int } from '@nestjs/graphql';
import { JournalEntryUpdateInput as _JournalEntryUpdateInput } from '../../@generated/prisma-nestjs-graphql/journal-entry/journal-entry-update.input';

@InputType()
export class JournalEntryUpdateInput extends _JournalEntryUpdateInput {
  @Field(() => Int, { nullable: false })
  id: number;
}
