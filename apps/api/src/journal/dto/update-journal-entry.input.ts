import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateJournalEntry {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field()
  date: string;
}
