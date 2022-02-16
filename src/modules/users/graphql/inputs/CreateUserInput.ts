import { Field, InputType } from 'type-graphql';
import { User } from '../../infra/typeorm/entities/User';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
