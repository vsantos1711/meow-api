import { Injectable } from '@nestjs/common';
import {
  CommentEntity,
  CreatePost,
  PostEntity,
} from '@/domain/entities/post.entity';
import { IPostRepository } from '@/domain/repositories/post';
import { PrismaService } from '@/infra/prisma/prisma.service';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany({
      skip: 0,
      take: 6,
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  async listByAuthor(id: string): Promise<PostEntity[]> {
    return await this.prisma.post.findMany({
      where: { authorId: id },
      include: { comments: true, author: true },
    });
  }

  async create(post: CreatePost, authorId: string): Promise<PostEntity> {
    return await this.prisma.post.create({
      data: {
        ...post,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
      include: {
        comments: true,
      },
    });
  }

  async delete(id: string): Promise<PostEntity> {
    return await this.prisma.post.delete({ where: { id } });
  }

  async comment(
    text: string,
    authorId: string,
    postId: string,
  ): Promise<CommentEntity> {
    return await this.prisma.comment.create({
      data: {
        text,
        authorId,
        postId,
      },
    });
  }
}
