import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutProfileInput } from '../user/user-create-nested-one-without-profile.input';

@InputType()
export class ProfileCreateInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Date, {nullable:false})
    birthDate!: Date | string;

    @Field(() => String, {nullable:true})
    bio?: string;

    @Field(() => UserCreateNestedOneWithoutProfileInput, {nullable:false})
    user!: UserCreateNestedOneWithoutProfileInput;
}
