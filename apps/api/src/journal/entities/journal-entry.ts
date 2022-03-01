import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field()
  date: string;

  @Field()
  json: string;
}
