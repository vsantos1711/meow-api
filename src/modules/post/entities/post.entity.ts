import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Relation
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { BaseEntity } from '../../../shared/db/typeorm/base.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column({ unique: true })
  url: string;

  @Column({ default: 0 })
  views: number;

  @Column()
  catName: string;

  @Column()
  catAge: string;

  @Column()
  catBreed: string;

  @Column()
  catWeight: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  author: Relation<User>;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments?: Relation<Comment[]>;
}
