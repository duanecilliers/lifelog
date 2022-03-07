import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryCreateInput } from './journal-entry-create.input';

@ArgsType()
export class CreateOneJournalEntryArgs {

    @Field(() => JournalEntryCreateInput, {nullable:false})
    data!: JournalEntryCreateInput;
}
