import { UserEntity } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/repositories/user';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.prisma.user.create({ data: user });
  }

  async update(user: UserEntity): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: { ...user },
    });
  }

  async delete(id: string): Promise<boolean> {
    const deleteUser = await this.prisma.user.delete({ where: { id } });
    return Boolean(deleteUser);
  }
}
