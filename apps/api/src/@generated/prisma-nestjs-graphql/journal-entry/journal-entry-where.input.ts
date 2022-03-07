import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';

@InputType()
export class JournalEntryWhereInput {

    @Field(() => [JournalEntryWhereInput], {nullable:true})
    AND?: Array<JournalEntryWhereInput>;

    @Field(() => [JournalEntryWhereInput], {nullable:true})
    OR?: Array<JournalEntryWhereInput>;

    @Field(() => [JournalEntryWhereInput], {nullable:true})
    NOT?: Array<JournalEntryWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    date?: DateTimeFilter;

    @Field(() => JsonFilter, {nullable:true})
    json?: JsonFilter;
}
