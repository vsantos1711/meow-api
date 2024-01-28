import { PostEntity } from '@/domain/entities/post.entity';
import { IPostRepository } from '@/domain/repositories/post.entity';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany();
  }

  async listByAuthor(id: string): Promise<PostEntity[]> {
    return await this.prisma.post.findMany({ where: { authorId: id } });
  }

  create(data: PostEntity): Promise<PostEntity> {
    return this.prisma.post.create({ data });
  }

  async delete(id: string): Promise<PostEntity> {
    return await this.prisma.post.delete({ where: { id } });
  }
}
