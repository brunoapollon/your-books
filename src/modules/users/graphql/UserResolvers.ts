import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
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
import { UpdateUserInput } from './inputs/UpdateUserInput';
import { UpdateUserService } from '../services/UpdateUserService';
import { DeleteUserService } from '../services/DeleteUserService';

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

  @Mutation(() => User)
  @UseMiddleware(ensureAuthenticated)
  public async updateUser(
    @Arg('data') { email, password, name }: UpdateUserInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<User> {
    const { id } = request.user;

    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute({
      id,
      name,
      email,
      password,
    });

    return updatedUser;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(ensureAuthenticated)
  public async deleteUser(): Promise<Boolean> {
    const { id } = request.user;

    const deleteUserService = new DeleteUserService();

    const resultDeleted = await deleteUserService.execute({ id });

    return resultDeleted;
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
