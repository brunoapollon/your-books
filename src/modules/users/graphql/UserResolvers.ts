import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { Resolver, Query, Mutation, Arg, Ctx, Args } from 'type-graphql';
import { CreateUserInput } from './inputs/CreateUserInput';
import { ContextParamMetadata } from 'type-graphql/dist/metadata/definitions';
import { getCustomRepository } from 'typeorm';
import { ShowUserByEmailInput } from './inputs/ShowUserByEmailInput';
import { BCryptHashProvider } from '../providers/HashPasswordProvider/implements/BCryptsHashPasswordProvider';

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
    if (!email || !password || !name)
      throw new Error('missing data for create user');

    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findUserByEmail(email);

    if (userExists) throw new Error('this email is already registered');

    const bcryptProvider = new BCryptHashProvider();

    const paswordHashed = await bcryptProvider.generateHash(password);

    const createdUser = await userRepository.createUser({
      name,
      email,
      password: paswordHashed,
    });

    return createdUser;
  }
}
