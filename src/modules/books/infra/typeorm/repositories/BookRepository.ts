import IBorrowBookDTO from 'src/modules/books/dtos/IBorrowBookDTO';
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

  public async findBookById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne(id);

    return book;
  }

  public async borrowBook({
    book_id,
    borrowed_user_id,
    user_id,
  }: IBorrowBookDTO): Promise<void> {
    const findedBook = await this.ormRepository.findOne({
      where: { id: book_id, user_id },
    });

    if (!findedBook) throw new Error('book not found');
  }

  public async save(book: Book): Promise<void> {
    await this.ormRepository.save(book);
  }

  public async findBooksByUserId(id: string): Promise<Book[]> {
    const findedBooksByUserId = await this.ormRepository.find({
      where: { user_id: id },
    });

    return findedBooksByUserId;
  }

  public async deleteBook(id: string): Promise<Boolean> {
    return !!this.ormRepository.delete(id);
  }

  public async findBookByIdAndUserId(
    user_id: string,
    id: string,
  ): Promise<Book | undefined> {
    const findedBook = await this.ormRepository.findOne({
      where: { id, user_id },
    });

    return findedBook;
  }

  public async findByBorrowedBooksAndByUserId(
    user_id: string,
  ): Promise<Book[]> {
    const findedBooksByUserId = await this.ormRepository.find({
      where: { user_id, borrowed: true },
    });

    return findedBooksByUserId;
  }
}

export { BookRepository };
