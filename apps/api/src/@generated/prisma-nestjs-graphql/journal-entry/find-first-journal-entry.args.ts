import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryWhereInput } from './journal-entry-where.input';
import { JournalEntryOrderByWithRelationInput } from './journal-entry-order-by-with-relation.input';
import { JournalEntryWhereUniqueInput } from './journal-entry-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JournalEntryScalarFieldEnum } from './journal-entry-scalar-field.enum';

@ArgsType()
export class FindFirstJournalEntryArgs {

    @Field(() => JournalEntryWhereInput, {nullable:true})
    where?: JournalEntryWhereInput;

    @Field(() => [JournalEntryOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<JournalEntryOrderByWithRelationInput>;

    @Field(() => JournalEntryWhereUniqueInput, {nullable:true})
    cursor?: JournalEntryWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [JournalEntryScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof JournalEntryScalarFieldEnum>;
}
