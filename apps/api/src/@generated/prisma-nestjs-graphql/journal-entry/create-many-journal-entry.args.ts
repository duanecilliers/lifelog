import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryCreateManyInput } from './journal-entry-create-many.input';

@ArgsType()
export class CreateManyJournalEntryArgs {

    @Field(() => [JournalEntryCreateManyInput], {nullable:false})
    data!: Array<JournalEntryCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
