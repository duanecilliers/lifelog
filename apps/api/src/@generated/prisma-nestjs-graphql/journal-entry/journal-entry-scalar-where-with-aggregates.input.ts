import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';

@InputType()
export class JournalEntryScalarWhereWithAggregatesInput {

    @Field(() => [JournalEntryScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<JournalEntryScalarWhereWithAggregatesInput>;

    @Field(() => [JournalEntryScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<JournalEntryScalarWhereWithAggregatesInput>;

    @Field(() => [JournalEntryScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<JournalEntryScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    date?: DateTimeWithAggregatesFilter;

    @Field(() => JsonWithAggregatesFilter, {nullable:true})
    json?: JsonWithAggregatesFilter;
}
