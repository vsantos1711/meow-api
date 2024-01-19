import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async create(user: UserEntity) {
    return await this.userRepository.create(user);
  }

  async update(user: UserEntity) {
    return await this.userRepository.update(user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
