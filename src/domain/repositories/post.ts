import { Post } from '../../modules/post/entities/post.entity';

export interface IPostRepository {
  listAll(): Promise<Post[]>;
  listByAuthor(id: string): Promise<Post[]>;
  create(data: Post, authorId: string): Promise<Post>;
  delete(id: string): Promise<Post>;
}
