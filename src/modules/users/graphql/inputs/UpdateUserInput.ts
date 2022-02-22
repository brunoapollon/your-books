import { Field, InputType } from 'type-graphql';
import { User } from '../../infra/typeorm/entities/User';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  password: string;
}
