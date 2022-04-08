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
import { BorrowedBookReturnAndDeleteInput } from './inputs/BorrowedBookReturnAndDeleteInput';
import { DeleteBookService } from '../services/DeleteBookService';
import { UpdateBookInput } from './inputs/UpdateBookInput';
import { UpdateBookService } from '../services/UpdateBookService';
import { FilterByBorrowedBooksAndByUserIdService } from '../services/FilterByBorrowedBooksAndByUserIdService';

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

    createdBook.user_id.password = null;
    if (createdBook.borrowed_user_id != null)
      createdBook.borrowed_user_id.password = null;

    return createdBook;
  }

  @Mutation(() => Book)
  @UseMiddleware(ensureAuthenticated)
  public async updateBook(
    @Arg('data') { book_id, title, description, author }: UpdateBookInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Book> {
    const { id } = request.user;

    const updateBookService = new UpdateBookService();

    const bookUpdated = await updateBookService.execute({
      book_id,
      user_id: id,
      title,
      description,
      author,
    });

    bookUpdated.user_id.password = null;
    if (bookUpdated.borrowed_user_id != null)
      bookUpdated.borrowed_user_id.password = null;

    return bookUpdated;
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

    book.user_id.password = null;
    if (book.borrowed_user_id != null) book.borrowed_user_id.password = null;

    return book;
  }

  @Mutation(() => Book)
  @UseMiddleware(ensureAuthenticated)
  public async borrowedBookReturn(
    @Arg('data') { book_id }: BorrowedBookReturnAndDeleteInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Book> {
    const { id } = request.user;

    const borrowedBookReturnService = new BorrowedBookReturnService();
    const findBookByIdService = new FindBookByIdService();

    await borrowedBookReturnService.execute({ user_id: id, book_id });

    const book = await findBookByIdService.execute({ book_id });

    book.user_id.password = null;
    if (book.borrowed_user_id != null) book.borrowed_user_id.password = null;

    return book;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(ensureAuthenticated)
  public async deleteBook(
    @Arg('data') { book_id }: BorrowedBookReturnAndDeleteInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Boolean> {
    const deleteBookService = new DeleteBookService();

    const deleteResult = await deleteBookService.execute({ book_id });

    return deleteResult;
  }

  @Query(() => [Book])
  @UseMiddleware(ensureAuthenticated)
  public async findBooksByUserId(): Promise<Book[]> {
    const { id } = request.user;

    const findBooksByUserIdService = new FindBooksByUserIdService();

    const findedBooksByUserId = await findBooksByUserIdService.execute({
      user_id: id,
    });

    const findedBooksByUserIdWithoutPassword = findedBooksByUserId.map(book => {
      book.user_id.password = null;
      if (book.borrowed_user_id != null) book.borrowed_user_id.password = null;
      return book;
    });

    return findedBooksByUserId;
  }

  @Query(() => [Book])
  @UseMiddleware(ensureAuthenticated)
  public async FilterByBorrowedBooksAndByUser(): Promise<Book[]> {
    const { id } = request.user;

    const filterByBorrowedBooksAndByUserIdService =
      new FilterByBorrowedBooksAndByUserIdService();

    const findedBooksByUserId =
      await filterByBorrowedBooksAndByUserIdService.execute({
        user_id: id,
      });

    const findedBooksByUserIdWithoutPassword = findedBooksByUserId.map(book => {
      book.user_id.password = null;
      if (book.borrowed_user_id != null) book.borrowed_user_id.password = null;
      return book;
    });

    return findedBooksByUserId;
  }

  @Query(() => Book)
  @UseMiddleware(ensureAuthenticated)
  public async findBookById(
    @Arg('data') { book_id }: BorrowedBookReturnAndDeleteInput,
    @Ctx() ctx: ContextParamMetadata,
  ): Promise<Book> {
    const findBookByIdService = new FindBookByIdService();

    const findedBookById = await findBookByIdService.execute({
      book_id,
    });

    findedBookById.user_id.password = null;
    if (findedBookById.borrowed_user_id != null)
      findedBookById.borrowed_user_id.password = null;

    return findedBookById;
  }
}
