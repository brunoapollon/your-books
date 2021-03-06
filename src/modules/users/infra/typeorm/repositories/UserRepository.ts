import ICreateUserDTO from 'src/modules/users/dtos/ICreateUserDTO';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async createUser({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const createdUser = await this.ormRepository.create({
      email,
      name,
      password,
    });
    await this.ormRepository.save(createdUser);

    return await this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findUserById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  public async deleteUser(id: string): Promise<Boolean> {
    return !!(await this.ormRepository.delete(id));
  }
}

export { UserRepository };
