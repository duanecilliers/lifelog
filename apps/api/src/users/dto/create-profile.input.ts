import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field()
  name: string;

  @Field()
  birthDate: string;

  @Field()
  bio: string;

  @Field(() => Int)
  userId: number;
}
