import {
  Entity,
  Column,
  ManyToOne,
  Relation,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from './post.entity';
import { BaseEntity } from '../../../shared/db/typeorm/base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.userComments)
  author: Relation<User>;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Relation<Post>;
}
