import { Field, InputType } from 'type-graphql';
import { Book } from '../../infra/typeorm/entities/Book';

@InputType()
export class BorrowBookInput implements Partial<Book> {
  @Field()
  book_id: string;

  @Field()
  borrowed_user_id: string;
}
