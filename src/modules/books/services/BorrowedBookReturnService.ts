import { UserRepository } from '../../../modules/users/infra/typeorm/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';

interface IRequestBorrowedBookReturnService {
  book_id: string;
  user_id: string;
}

class BorrowedBookReturnService {
  private bookRepository: BookRepository;
  private userRepository: UserRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    user_id,
    book_id,
  }: IRequestBorrowedBookReturnService): Promise<void> {
    if (!user_id || !book_id) throw new Error('missing data to borrow book');

    const findedUser = await this.userRepository.findUserById(user_id);

    if (!findedUser) throw new Error('User not found');

    const findedBook = await this.bookRepository.findBookById(book_id);

    if (!findedBook) throw new Error('book not found');

    findedBook.borrowed = false;
    findedBook.borrowed_user_id = null;

    await this.bookRepository.save(findedBook);
  }
}

export { BorrowedBookReturnService };
