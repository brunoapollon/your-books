import { ensureAuthenticated } from '../../../modules/users/infra/http/middlewares/ensuredAuthenticated';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { ContextParamMetadata } from 'type-graphql/dist/metadata/definitions';
import { Book } from '../infra/typeorm/entities/Book';
import { CreateBookService } from '../services/CreateBookService';
import { CreateBookInput } from './inputs/CreateBookInput';
import { request } from 'express';

@Resolver()
export class BookResolvers {
  @Mutation(() => Book)
  @UseMiddleware(ensureAuthenticated)
  public async createBook(
    @Arg('data') { title, description, author }: CreateBookInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Book> {
    const { id } = request.user;

    const createBookService = new CreateBookService();

    const createdBook = await createBookService.execute({
      user_id: id,
      title,
      description,
      author,
    });

    return createdBook;
  }
}
