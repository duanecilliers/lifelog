import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryUpdateManyMutationInput } from './journal-entry-update-many-mutation.input';
import { JournalEntryWhereInput } from './journal-entry-where.input';

@ArgsType()
export class UpdateManyJournalEntryArgs {

    @Field(() => JournalEntryUpdateManyMutationInput, {nullable:false})
    data!: JournalEntryUpdateManyMutationInput;

    @Field(() => JournalEntryWhereInput, {nullable:true})
    where?: JournalEntryWhereInput;
}
