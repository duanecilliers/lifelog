import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedJsonFilter } from './nested-json-filter.input';

@InputType()
export class JsonWithAggregatesFilter {

    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;

    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedJsonFilter, {nullable:true})
    _min?: NestedJsonFilter;

    @Field(() => NestedJsonFilter, {nullable:true})
    _max?: NestedJsonFilter;
}
