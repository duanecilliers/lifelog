import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JournalEntryCountAggregate } from './journal-entry-count-aggregate.output';
import { JournalEntryAvgAggregate } from './journal-entry-avg-aggregate.output';
import { JournalEntrySumAggregate } from './journal-entry-sum-aggregate.output';
import { JournalEntryMinAggregate } from './journal-entry-min-aggregate.output';
import { JournalEntryMaxAggregate } from './journal-entry-max-aggregate.output';

@ObjectType()
export class JournalEntryGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => Date, {nullable:false})
    date!: Date | string;

    @Field(() => GraphQLJSON, {nullable:false})
    json!: any;

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
