import { getCustomRepository } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { BCryptHashProvider } from '../providers/HashPasswordProvider/implements/BCryptsHashPasswordProvider';

import authConfig from '../../../configs/auth';
import { sign } from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';

interface IRequestAuthenticateUserService {
  email: string;
  password: string;
}

interface IResponseAuthenticateUserService {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    email,
    password,
  }: IRequestAuthenticateUserService): Promise<IResponseAuthenticateUserService> {
    if (!email || !password) throw new Error('missing data for authentication');

    const findedUser = await this.userRepository.findUserByEmail(email);

    if (!findedUser) throw new Error('email or password not match');

    const bcryptHashProvider = new BCryptHashProvider();

    const passwordMatch = await bcryptHashProvider.compareHash(
      password,
      findedUser.password,
    );

    if (!passwordMatch) throw new Error('email or password not match');

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: findedUser.id,
      expiresIn,
    });

    const user = plainToClass(User, findedUser);

    return { user, token };
  }
}

export { AuthenticateUserService };
