import { Injectable } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostEntity } from '@/domain/entities/post.entity';
@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll() {
    return await this.postRepository.listAll();
  }

  async findByAuthor(id: string) {
    return await this.postRepository.listByAuthor(id);
  }

  async create(post: PostEntity, authorId: string) {
    return await this.postRepository.create(post, authorId);
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }

  async comment(comment: string, authorId: string, postId: string) {
    return await this.postRepository.comment(comment, authorId, postId);
  }
}
