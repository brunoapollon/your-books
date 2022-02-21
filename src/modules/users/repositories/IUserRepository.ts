import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  createUser(data: ICreateUserDTO): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserById(id: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
