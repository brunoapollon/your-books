import ICreateBookDTO from '../dtos/ICreateBookDTO';
import { Book } from '../infra/typeorm/entities/Book';

export default interface IBookRepository {
  createBook(data: ICreateBookDTO): Promise<Book>;
}
