import { getCustomRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { BCryptHashProvider } from '../providers/HashPasswordProvider/implements/BCryptsHashPasswordProvider';

interface IRequestUpdateUserService {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    id,
    email,
    password,
    name,
  }: IRequestUpdateUserService): Promise<User> {
    if (!password) throw new Error('password must be provided.');

    const findedUser = await this.userRepository.findUserById(id);

    if (!findedUser) throw new Error('User does not exists.');

    const bcryptHashProvider = new BCryptHashProvider();

    const passwordMatch = await bcryptHashProvider.compareHash(
      password,
      findedUser.password,
    );

    if (!passwordMatch) throw new Error('password is incorrect.');

    findedUser.name = name;
    findedUser.email = email;

    await this.userRepository.save(findedUser);

    const updatedUser = await this.userRepository.findUserById(id);

    if (!updatedUser) throw new Error('User does not exists.');

    return plainToClass(User, updatedUser);
  }
}

export { UpdateUserService };
