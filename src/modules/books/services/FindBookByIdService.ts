import { getCustomRepository } from 'typeorm';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';
import { Book } from '../infra/typeorm/entities/Book';

interface IRequestFindBookByIdService {
  book_id: string;
}

class FindBookByIdService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
  }

  public async execute({
    book_id,
  }: IRequestFindBookByIdService): Promise<Book> {
    const findedBook = await this.bookRepository.findBookById(book_id);

    if (!findedBook) throw new Error('book not found');

    return findedBook;
  }
}

export { FindBookByIdService };
