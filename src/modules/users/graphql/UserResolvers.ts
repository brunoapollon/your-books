import { Resolver, Query, Mutation, Arg, Ctx, Args } from 'type-graphql';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { CreateUserInput } from './inputs/CreateUserInput';
import { ContextParamMetadata } from 'type-graphql/dist/metadata/definitions';
import { ShowUserByEmailInput } from './inputs/ShowUserByEmailInput';
import { CreateUserService } from '../services/CreateUserService';

@Resolver()
export class userResolvers {
  @Query(_returns => User)
  async showUserByEmail(
    @Args() { email }: ShowUserByEmailInput,
  ): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new Error('user not found');

    return user;
  }

  @Mutation(() => User)
  public async createUser(
    @Arg('data') { email, password, name }: CreateUserInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<User> {
    const createUserService = new CreateUserService();

    const createdUser = await createUserService.execute({
      email,
      password,
      name,
    });

    return createdUser;
  }
}
