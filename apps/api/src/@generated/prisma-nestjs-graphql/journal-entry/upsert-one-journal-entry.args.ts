import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryWhereUniqueInput } from './journal-entry-where-unique.input';
import { JournalEntryCreateInput } from './journal-entry-create.input';
import { JournalEntryUpdateInput } from './journal-entry-update.input';

@ArgsType()
export class UpsertOneJournalEntryArgs {

    @Field(() => JournalEntryWhereUniqueInput, {nullable:false})
    where!: JournalEntryWhereUniqueInput;

    @Field(() => JournalEntryCreateInput, {nullable:false})
    create!: JournalEntryCreateInput;

    @Field(() => JournalEntryUpdateInput, {nullable:false})
    update!: JournalEntryUpdateInput;
}
