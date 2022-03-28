import { ensureAuthenticated } from '../../../modules/users/infra/http/middlewares/ensuredAuthenticated';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { ContextParamMetadata } from 'type-graphql/dist/metadata/definitions';
import { Book } from '../infra/typeorm/entities/Book';
import { CreateBookService } from '../services/CreateBookService';
import { CreateBookInput } from './inputs/CreateBookInput';
import { request } from 'express';
import { BorrowBookInput } from './inputs/BorrowUsertInput';
import { BorrowBookService } from '../services/BorrowBookService';
import { FindBookByIdService } from '../services/FindBookByIdService';
import { FindBooksByUserIdService } from '../services/FindBooksByUserIdService';
import { BorrowedBookReturnService } from '../services/BorrowedBookReturnService';
import { BorrowedBookReturnInput } from './inputs/BorrowedBookReturnInput';

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

  @Mutation(() => Book)
  @UseMiddleware(ensureAuthenticated)
  public async borrowBook(
    @Arg('data') { book_id, borrowed_user_id }: BorrowBookInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Book> {
    const { id } = request.user;

    const borrowBookService = new BorrowBookService();
    const findBookByIdService = new FindBookByIdService();

    await borrowBookService.execute({ user_id: id, book_id, borrowed_user_id });

    const book = await findBookByIdService.execute({ book_id });

    return book;
  }

  @Mutation(() => Book)
  @UseMiddleware(ensureAuthenticated)
  public async borrowedBookReturn(
    @Arg('data') { book_id }: BorrowedBookReturnInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Book> {
    const { id } = request.user;

    const borrowedBookReturnService = new BorrowedBookReturnService();
    const findBookByIdService = new FindBookByIdService();

    await borrowedBookReturnService.execute({ user_id: id, book_id });

    const book = await findBookByIdService.execute({ book_id });

    return book;
  }

  @Query(() => [Book])
  @UseMiddleware(ensureAuthenticated)
  public async findBooksByUserId(): Promise<Book[]> {
    const { id } = request.user;

    const findBooksByUserIdService = new FindBooksByUserIdService();

    const findedBooksByUserId = await findBooksByUserIdService.execute({
      user_id: id,
    });
    console.log(id);

    return findedBooksByUserId;
  }
}
