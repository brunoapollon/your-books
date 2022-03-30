import { Field, InputType } from 'type-graphql';
import { Book } from '../../infra/typeorm/entities/Book';

@InputType()
export class UpdateBookInput implements Partial<Book> {
  @Field()
  book_id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  author: string;
}
