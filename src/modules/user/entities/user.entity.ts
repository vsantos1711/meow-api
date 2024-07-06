import {
  Entity,
  Column,
  OneToMany,
  Relation,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../post/entities/comment.entity';
import { BaseEntity } from '../../../shared/db/typeorm/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Relation<Post[]>;

  @OneToMany(() => Comment, (comment: Comment) => comment.author)
  userComments: Relation<Comment[]>;
}
