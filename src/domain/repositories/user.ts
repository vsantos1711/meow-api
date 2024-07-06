import { User } from '../../modules/user/entities/user.entity'

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(data: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
