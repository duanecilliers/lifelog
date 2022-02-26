import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from './profile.entity';

@ObjectType()
export class User {
  /** @todo add created at field */

  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => Profile)
  profile: Profile;
}
