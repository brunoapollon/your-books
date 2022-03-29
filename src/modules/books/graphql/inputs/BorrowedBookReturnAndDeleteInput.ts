import { Field, InputType } from 'type-graphql';

@InputType()
export class BorrowedBookReturnAndDeleteInput {
  @Field()
  book_id: string;
}
