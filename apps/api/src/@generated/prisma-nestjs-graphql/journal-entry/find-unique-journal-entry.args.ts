import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryWhereUniqueInput } from './journal-entry-where-unique.input';

@ArgsType()
export class FindUniqueJournalEntryArgs {

    @Field(() => JournalEntryWhereUniqueInput, {nullable:false})
    where!: JournalEntryWhereUniqueInput;
}
