import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryUpdateInput } from './journal-entry-update.input';
import { JournalEntryWhereUniqueInput } from './journal-entry-where-unique.input';

@ArgsType()
export class UpdateOneJournalEntryArgs {

    @Field(() => JournalEntryUpdateInput, {nullable:false})
    data!: JournalEntryUpdateInput;

    @Field(() => JournalEntryWhereUniqueInput, {nullable:false})
    where!: JournalEntryWhereUniqueInput;
}
