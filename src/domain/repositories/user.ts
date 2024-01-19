import { UserEntity } from '@/domain/entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity>;
  create(data: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<boolean>;
}
