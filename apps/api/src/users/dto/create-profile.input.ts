import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field()
  birthDate: string;

  @Field()
  bio: string;

  @Field(() => Int)
  userId: number;
}
