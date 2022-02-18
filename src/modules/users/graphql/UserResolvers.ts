import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Args,
  UseMiddleware,
} from 'type-graphql';
import { User } from '../infra/typeorm/entities/User';
import { CreateUserInput } from './inputs/CreateUserInput';
import { ContextParamMetadata } from 'type-graphql/dist/metadata/definitions';
import { CreateUserService } from '../services/CreateUserService';
import { AuthenticationInput } from './inputs/AuthenticationInput';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { Authentication } from './models/Authentication';
import { ensureAuthenticated } from '../infra/http/middlewares/ensuredAuthenticated';
import { request } from 'express';
import { ShowUserByIdService } from '../services/ShowUserByIdService';

@Resolver()
export class userResolvers {
  @Query(_returns => User)
  @UseMiddleware(ensureAuthenticated)
  async showUser(): Promise<User> {
    const { id } = request.user;

    const showUserByIdService = new ShowUserByIdService();

    const user = await showUserByIdService.execute({ id });

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
