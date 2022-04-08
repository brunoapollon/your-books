import { getCustomRepository } from 'typeorm';
import { Book } from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';

interface IRequestFilterByBorrowedBooksAndByUserIdService {
  user_id: string;
}

class FilterByBorrowedBooksAndByUserIdService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
  }

  public async execute({
    user_id,
  }: IRequestFilterByBorrowedBooksAndByUserIdService): Promise<Book[]> {
    if (!user_id) throw new Error('missing user id');

    const findedBooks =
      await this.bookRepository.findByBorrowedBooksAndByUserId(user_id);

    return findedBooks;
  }
}

export { FilterByBorrowedBooksAndByUserIdService };
