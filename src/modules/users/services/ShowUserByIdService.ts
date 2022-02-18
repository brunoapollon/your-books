import { plainToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { BCryptHashProvider } from '../providers/HashPasswordProvider/implements/BCryptsHashPasswordProvider';

interface IRequestShowUserByIdService {
  id: string;
}

class ShowUserByIdService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({ id }: IRequestShowUserByIdService): Promise<User> {
    if (!id) throw new Error('id must be provide.');

    const findedUser = await this.userRepository.findUserById(id);

    if (!findedUser) throw new Error('user not found');

    const user = plainToClass(User, findedUser);

    return user;
  }
}

export { ShowUserByIdService };
