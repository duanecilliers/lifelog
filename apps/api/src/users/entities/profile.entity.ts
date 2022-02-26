import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  birthDate: string;

  @Field()
  bio: string;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  userId: number;
}
