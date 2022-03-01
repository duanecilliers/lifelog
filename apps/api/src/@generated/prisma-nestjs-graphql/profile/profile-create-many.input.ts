import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ProfileCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Date, {nullable:false})
    birthDate!: Date | string;

    @Field(() => String, {nullable:true})
    bio?: string;

    @Field(() => Int, {nullable:false})
    userId!: number;
}
