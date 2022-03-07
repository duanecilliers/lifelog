import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProfileCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Date, {nullable:false})
    birthDate!: Date | string;

    @Field(() => String, {nullable:true})
    bio?: string;
}
