import { Field, InputType } from 'type-graphql';
import { Book } from '../../infra/typeorm/entities/Book';

@InputType()
export class CreateBookInput implements Partial<Book> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  author: string;
}
