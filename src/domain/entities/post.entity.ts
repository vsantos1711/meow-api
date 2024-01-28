import { UserEntity } from './user.entity';

export type PostEntity = {
  id?: string;
  url: string;
  views: number;
  catName: string;
  catAge: string;
  catBreed: string;
  catWeight: string;
  authorId: string;
  comments?: CommentEntity[];
  createdAt?: Date;
};

export type CommentEntity = {
  id?: string;
  text: string;
  authorId: string;
  author: UserEntity;
  postId: string;
  post: PostEntity;
  createdAt?: Date;
};
