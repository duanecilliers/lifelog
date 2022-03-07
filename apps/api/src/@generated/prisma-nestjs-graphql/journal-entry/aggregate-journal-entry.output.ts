import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JournalEntryCountAggregate } from './journal-entry-count-aggregate.output';
import { JournalEntryAvgAggregate } from './journal-entry-avg-aggregate.output';
import { JournalEntrySumAggregate } from './journal-entry-sum-aggregate.output';
import { JournalEntryMinAggregate } from './journal-entry-min-aggregate.output';
import { JournalEntryMaxAggregate } from './journal-entry-max-aggregate.output';

@ObjectType()
export class AggregateJournalEntry {

    @Field(() => JournalEntryCountAggregate, {nullable:true})
    _count?: JournalEntryCountAggregate;

    @Field(() => JournalEntryAvgAggregate, {nullable:true})
    _avg?: JournalEntryAvgAggregate;

    @Field(() => JournalEntrySumAggregate, {nullable:true})
    _sum?: JournalEntrySumAggregate;

    @Field(() => JournalEntryMinAggregate, {nullable:true})
    _min?: JournalEntryMinAggregate;

    @Field(() => JournalEntryMaxAggregate, {nullable:true})
    _max?: JournalEntryMaxAggregate;
}
