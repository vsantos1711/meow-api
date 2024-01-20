import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';
import { HashPassword } from './utils/hash-password';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  private readonly hashPassword = HashPassword;

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async create(user: UserEntity) {
    user.password = await this.hashPassword.hash(user.password);
    return await this.userRepository.create(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(user: UserEntity) {
    return await this.userRepository.update(user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
