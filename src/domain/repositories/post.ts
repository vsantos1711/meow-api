import { PostEntity } from '@/domain/entities/post.entity';

export interface IPostRepository {
  listAll(): Promise<PostEntity[]>;
  listByAuthor(id: string): Promise<PostEntity[]>;
  create(data: PostEntity, authorId: string): Promise<PostEntity>;
  delete(id: string): Promise<PostEntity>;
}
