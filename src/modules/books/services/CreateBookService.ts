import { getCustomRepository } from 'typeorm';
import { Book } from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';

interface IRequestCreateBookService {
  title: string;
  description: string;
  author: string;
  user_id: string;
}

class CreateBookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
  }

  public async execute({
    author,
    title,
    description,
    user_id,
  }: IRequestCreateBookService): Promise<Book> {
    if (!author || !title || !description || !user_id)
      throw new Error('missing data for create book');

    const createdBook = await this.bookRepository.createBook({
      author,
      title,
      description,
      user_id,
    });

    if (!createdBook) throw new Error('falied to create book');

    return createdBook;
  }
}

export { CreateBookService };
