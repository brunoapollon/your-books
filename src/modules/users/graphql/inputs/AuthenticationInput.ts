import { Field, InputType } from 'type-graphql';
import { User } from '../../infra/typeorm/entities/User';

@InputType()
export class AuthenticationInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
