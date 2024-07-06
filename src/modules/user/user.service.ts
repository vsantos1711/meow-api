import { Injectable, Logger } from '@nestjs/common';
import { HashPassword } from './utils/hash-password';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserNotFoundError } from './errors/user-not-found';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

export interface LoggedUser {
  username: string;
  email: string;
  sub: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  private readonly logger = new Logger(UserService.name);
  private readonly hashPassword = HashPassword;

  async findAll() {
    this.logger.log('Fetching all users');
    return await this.userRepository.find();
  }

  async findById(id: string) {
    this.logger.log(`Fetching user with id: ${id}`);
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      this.logger.warn(`User with id: ${id} not found`);
      throw new UserNotFoundError(id);
    }
    this.logger.log(`Found user with id: ${id}`);
    return user
  }

  async create(dto: CreateUserDto) {
    this.logger.log(`Creating user with username: ${dto.username}`);
    dto.password = await this.hashPassword.hash(dto.password);
    delete dto.confirmPassword;
    const user = this.userRepository.create(dto);
    this.logger.log(`User created with id: ${user.id}`);
    return this.userRepository.save(user);
  }

  async findByUsername(username: string) {
    this.logger.log(`Fetching user with username: ${username}`);
    const user = await this.userRepository.findOneBy({
      username,
      deletedAt: null,
    });
    if (!user) {
      this.logger.warn(`User with username: ${username} not found`);
      throw new UserNotFoundError();
    }
    this.logger.log(`Found user with username: ${username}`);
    return user
  }

  async update(dto: UpdateUserDto, loggedUser: LoggedUser) {
    this.logger.log(`Fetching user with username: ${loggedUser.username}`);
    const user = await this.findByUsername(loggedUser.username);
    if (!user) {
      this.logger.warn(`User with username: ${loggedUser.username} not found`);
      throw new UserNotFoundError();
    }
    const updatedUser = this.userRepository.merge(user, dto);

    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}