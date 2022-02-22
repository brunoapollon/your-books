import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../infra/typeorm/entities/User';

@ObjectType()
class Authentication {
  @Field(type => String)
  token: string;

  @Field(type => User)
  user: User;
}

export { Authentication };
