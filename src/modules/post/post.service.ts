import { Injectable } from '@nestjs/common';
import { addRandomVariant } from '../utils/randomVariant';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(    
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>,
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>,
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
) {}

  async findAll() {
    const postList = await this.postRepository.find();
    const listWithVariants = addRandomVariant(postList);
    return listWithVariants;
  }

  async findByAuthor(id: string) {
    const user = await this.userRepository.findOneBy({id});
    return await this.postRepository.findOneBy({ author: user });
  }

  async create(dto: CreatePostDto, authorId: string) {
    const author = await this.userRepository.findOneBy({ id: authorId });
    const post = this.postRepository.create({
      author,
      ...dto
    });
    return this.postRepository.save(post);
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }

  async comment(text: string, authorId: string, postId: string) {
    const post = await this.postRepository.findOneBy({ id: postId });
    const author = await this.userRepository.findOneBy({ id: authorId });

    const comment = this.commentRepository.create({ author, post, text });
    return this.commentRepository.save(comment);
  }
}
