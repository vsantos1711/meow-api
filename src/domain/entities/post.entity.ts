import { UserEntity } from './user.entity';

export type PostEntity = {
  id?: string;
  url: string;
  views: number;
  catName: string;
  catAge: string;
  catBreed: string;
  catWeight: string;
  comments?: CommentEntity[];
  author?: UserEntity;
  createdAt?: Date;
  variant?: string;
};

export type CreatePost = Omit<PostEntity, 'comments'>;

export type CommentEntity = {
  id?: string;
  text: string;
  authorId: string;
  author?: UserEntity;
  postId: string;
  post?: PostEntity;
  createdAt?: Date;
};
