import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryWhereInput } from './journal-entry-where.input';

@ArgsType()
export class DeleteManyJournalEntryArgs {

    @Field(() => JournalEntryWhereInput, {nullable:true})
    where?: JournalEntryWhereInput;
}
