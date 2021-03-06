import IBorrowBookDTO from '../dtos/IBorrowBookDTO';
import ICreateBookDTO from '../dtos/ICreateBookDTO';
import { Book } from '../infra/typeorm/entities/Book';

export default interface IBookRepository {
  createBook(data: ICreateBookDTO): Promise<Book>;
  findBookById(id: string): Promise<Book | undefined>;
  findBooksByUserId(id: string): Promise<Book[]>;
  borrowBook(data: IBorrowBookDTO): Promise<void>;
  save(book: Book): Promise<void>;
  deleteBook(id: string): Promise<Boolean>;
  findBookByIdAndUserId(user_id: string, id: string): Promise<Book | undefined>;
  findByBorrowedBooksAndByUserId(user_id: string): Promise<Book[]>;
}
