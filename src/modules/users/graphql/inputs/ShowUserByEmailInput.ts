import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ShowUserByEmailInput {
  @Field()
  email: string;
}
