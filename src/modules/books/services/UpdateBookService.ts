import { getCustomRepository } from 'typeorm';
import { Book } from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BookRepository';

interface IRequestUpdateBookService {
  title: string;
  description: string;
  author: string;
  user_id: string;
  book_id: string;
}

class UpdateBookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
  }

  public async execute({
    author,
    title,
    description,
    user_id,
    book_id,
  }: IRequestUpdateBookService): Promise<Book> {
    if (!book_id || !user_id)
      throw new Error('book id and user id must be provid');

    const findedBook = await this.bookRepository.findBookById(book_id);

    if (!findedBook) throw new Error('book not found');

    const permissionToEditBook =
      await this.bookRepository.findBookByIdAndUserId(user_id, book_id);

    console.log(permissionToEditBook);

    if (!permissionToEditBook)
      throw new Error('you do not have permission to edit this book');

    findedBook.author = author;
    findedBook.title = title;
    findedBook.description = description;

    await this.bookRepository.save(findedBook);

    return findedBook;
  }
}

export { UpdateBookService };
