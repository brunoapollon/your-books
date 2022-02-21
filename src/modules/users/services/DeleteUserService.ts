import { getCustomRepository } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequestDeleteUserService {
  id: string;
}

class DeleteUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({ id }: IRequestDeleteUserService): Promise<Boolean> {
    if (!id) throw new Error('id must be provide.');

    const findedUser = await this.userRepository.findUserById(id);

    if (!findedUser) throw new Error('user not found');

    const resultDeleted = await this.userRepository.deleteUser(id);

    if (!resultDeleted) throw new Error('delete user failed.');

    return resultDeleted;
  }
}

export { DeleteUserService };
