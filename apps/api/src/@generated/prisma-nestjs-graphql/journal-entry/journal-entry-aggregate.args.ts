import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JournalEntryWhereInput } from './journal-entry-where.input';
import { JournalEntryOrderByWithRelationInput } from './journal-entry-order-by-with-relation.input';
import { JournalEntryWhereUniqueInput } from './journal-entry-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JournalEntryCountAggregateInput } from './journal-entry-count-aggregate.input';
import { JournalEntryAvgAggregateInput } from './journal-entry-avg-aggregate.input';
import { JournalEntrySumAggregateInput } from './journal-entry-sum-aggregate.input';
import { JournalEntryMinAggregateInput } from './journal-entry-min-aggregate.input';
import { JournalEntryMaxAggregateInput } from './journal-entry-max-aggregate.input';

@ArgsType()
export class JournalEntryAggregateArgs {

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

    @Field(() => JournalEntryCountAggregateInput, {nullable:true})
    _count?: JournalEntryCountAggregateInput;

    @Field(() => JournalEntryAvgAggregateInput, {nullable:true})
    _avg?: JournalEntryAvgAggregateInput;

    @Field(() => JournalEntrySumAggregateInput, {nullable:true})
    _sum?: JournalEntrySumAggregateInput;

    @Field(() => JournalEntryMinAggregateInput, {nullable:true})
    _min?: JournalEntryMinAggregateInput;

    @Field(() => JournalEntryMaxAggregateInput, {nullable:true})
    _max?: JournalEntryMaxAggregateInput;
}
