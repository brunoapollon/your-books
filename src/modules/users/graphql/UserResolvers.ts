import { Resolver, Query, Mutation, Arg, Ctx, Args } from 'type-graphql';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { CreateUserInput } from './inputs/CreateUserInput';
import { ContextParamMetadata } from 'type-graphql/dist/metadata/definitions';
import { ShowUserByEmailInput } from './inputs/ShowUserByEmailInput';
import { CreateUserService } from '../services/CreateUserService';
import { ShowUserByEmailService } from '../services/ShowUserByEmailService';
import { AuthenticationInput } from './inputs/AuthenticationInput';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { Authentication } from './models/Authentication';

@Resolver()
export class userResolvers {
  @Query(_returns => User)
  async showUserByEmail(
    @Args() { email }: ShowUserByEmailInput,
  ): Promise<User> {
    const showUserByEmailService = new ShowUserByEmailService();

    const user = await showUserByEmailService.execute({ email });

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

  @Mutation(() => Authentication)
  public async userAuthenticatication(
    @Arg('data') { email, password }: AuthenticationInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Authentication> {
    const authenticateUserService = new AuthenticateUserService();

    const userAutenticated = authenticateUserService.execute({
      email,
      password,
    });

    return userAutenticated;
  }
}
