import { Field, InputType } from 'type-graphql';
import { Book } from '../../infra/typeorm/entities/Book';

@InputType()
export class BorrowedBookReturnInput {
  @Field()
  book_id: string;
}
