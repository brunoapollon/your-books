import IBorrowBookDTO from '../dtos/IBorrowBookDTO';
import ICreateBookDTO from '../dtos/ICreateBookDTO';
import { Book } from '../infra/typeorm/entities/Book';

export default interface IBookRepository {
  createBook(data: ICreateBookDTO): Promise<Book>;
  findBookById(id: string): Promise<Book | undefined>;
  borrowBook(data: IBorrowBookDTO): Promise<void>;
  save(book: Book): Promise<void>;
}
