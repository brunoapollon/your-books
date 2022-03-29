import { UserRepository } from '../../../modules/users/infra/typeorm/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { Book } from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';

interface IRequestFiindBooksByUserIdService {
  user_id: string;
}

class FindBooksByUserIdService {
  private bookRepository: BookRepository;
  private userRepository: UserRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    user_id,
  }: IRequestFiindBooksByUserIdService): Promise<Book[]> {
    if (!user_id) throw new Error('missing data for find books');

    const findedUser = await this.userRepository.findUserById(user_id);

    if (!findedUser) throw new Error('user not found');

    const findedBooksByUserId = await this.bookRepository.findBooksByUserId(
      findedUser.id,
    );

    return findedBooksByUserId;
  }
}

export { FindBooksByUserIdService };
