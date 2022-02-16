import { getCustomRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { BCryptHashProvider } from '../providers/HashPasswordProvider/implements/BCryptsHashPasswordProvider';

interface IRequestCreateUserService {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    email,
    password,
    name,
  }: IRequestCreateUserService): Promise<User> {
    if (!email || !password || !name)
      throw new Error('missing data for create user');

    const userExists = await this.userRepository.findUserByEmail(email);

    if (userExists) throw new Error('this email is already registered');

    const bcryptProvider = new BCryptHashProvider();

    const paswordHashed = await bcryptProvider.generateHash(password);

    const createdUser = await this.userRepository.createUser({
      name,
      email,
      password: paswordHashed,
    });

    const user = plainToClass(User, createdUser);

    return user;
  }
}

export { CreateUserService };
