import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JournalEntryCountOrderByAggregateInput } from './journal-entry-count-order-by-aggregate.input';
import { JournalEntryAvgOrderByAggregateInput } from './journal-entry-avg-order-by-aggregate.input';
import { JournalEntryMaxOrderByAggregateInput } from './journal-entry-max-order-by-aggregate.input';
import { JournalEntryMinOrderByAggregateInput } from './journal-entry-min-order-by-aggregate.input';
import { JournalEntrySumOrderByAggregateInput } from './journal-entry-sum-order-by-aggregate.input';

@InputType()
export class JournalEntryOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    json?: keyof typeof SortOrder;

    @Field(() => JournalEntryCountOrderByAggregateInput, {nullable:true})
    _count?: JournalEntryCountOrderByAggregateInput;

    @Field(() => JournalEntryAvgOrderByAggregateInput, {nullable:true})
    _avg?: JournalEntryAvgOrderByAggregateInput;

    @Field(() => JournalEntryMaxOrderByAggregateInput, {nullable:true})
    _max?: JournalEntryMaxOrderByAggregateInput;

    @Field(() => JournalEntryMinOrderByAggregateInput, {nullable:true})
    _min?: JournalEntryMinOrderByAggregateInput;

    @Field(() => JournalEntrySumOrderByAggregateInput, {nullable:true})
    _sum?: JournalEntrySumOrderByAggregateInput;
}
