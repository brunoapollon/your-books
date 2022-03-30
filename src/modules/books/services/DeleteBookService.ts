import { getCustomRepository } from 'typeorm';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';

interface IRequestDeleteBookService {
  book_id: string;
}

class DeleteBookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
  }

  public async execute({
    book_id,
  }: IRequestDeleteBookService): Promise<Boolean> {
    if (!book_id) throw new Error('missing book_id');

    const findedBook = await this.bookRepository.findBookById(book_id);

    if (!findedBook) throw new Error('book not found');

    return !!(await this.bookRepository.deleteBook(book_id));
  }
}

export { DeleteBookService };
