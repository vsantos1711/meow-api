import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }
  async findById(id: string) {
    return this.userRepository.findById(id);
  }
  async create(user: UserEntity) {
    return this.userRepository.create(user);
  }
  async update(user: UserEntity) {
    return this.userRepository.update(user);
  }
  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
