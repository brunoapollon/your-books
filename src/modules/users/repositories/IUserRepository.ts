import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  createUser(data: ICreateUserDTO): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
}
