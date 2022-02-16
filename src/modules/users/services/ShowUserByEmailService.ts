import { plainToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { BCryptHashProvider } from '../providers/HashPasswordProvider/implements/BCryptsHashPasswordProvider';

interface IRequestShowUserByEmailService {
  email: string;
}

class ShowUserByEmailService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    email,
  }: IRequestShowUserByEmailService): Promise<User> {
    if (!email) throw new Error('email must be provide.');

    const findedUser = await this.userRepository.findUserByEmail(email);

    if (!findedUser) throw new Error('user not found');

    const user = plainToClass(User, findedUser);

    return user;
  }
}

export { ShowUserByEmailService };
