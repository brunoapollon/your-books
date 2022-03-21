import ICreateBookDTO from 'src/modules/books/dtos/ICreateBookDTO';
import IBookRepository from 'src/modules/books/repositories/IBookRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Book } from '../entities/Book';

@EntityRepository(Book)
class BookRepository implements IBookRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async createBook(data: ICreateBookDTO): Promise<Book> {
    const { author, title, description, user_id } = data;

    const createdUser = await this.ormRepository.create({
      author,
      title,
      description,
      user_id,
    });

    await this.ormRepository.save(createdUser);

    return createdUser;
  }
}

export { BookRepository };
