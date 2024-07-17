import { Injectable, Logger } from '@nestjs/common';
import { addRandomVariant } from '../utils/randomVariant';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll() {
    this.logger.log('Fetching all posts with author relations');
    const postList = await this.postRepository.find({
      relations: ['author'],
      select: {
        author: {
          id: true,
          username: true,
          email: true,
        },
      },
    });
    this.logger.log(`Found ${postList.length} posts`);
    const listWithVariants = addRandomVariant(postList);
    this.logger.log('Added random variants to posts');
    return listWithVariants;
  }

  async listComments(postId: string) {
    this.logger.log(`Fetching comments for post with id: ${postId}`);
    const comments = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author'],
      select: {
        author: {
          id: true,
          username: true,
          email: true,
        },
      },
    });
    this.logger.log(
      `Found ${comments.length} comments for post with id: ${postId}`,
    );
    return comments;
  }

  async listByAuthor(id: string) {
    this.logger.log(`Fetching posts by author with id: ${id}`);
    const posts = await this.postRepository.findBy({
      author: {
        id,
      },
    });
    this.logger.log(`Found ${posts.length} posts by author with id: ${id}`);
    return posts;
  }

  async create(dto: CreatePostDto, authorId: string) {
    this.logger.log(`Creating a new post for author with id: ${authorId}`);
    const post = this.postRepository.create({
      author: {
        id: authorId,
      },
      ...dto,
    });
    const savedPost = await this.postRepository.save(post);
    this.logger.log(
      `Created a new post with id: ${savedPost.id} for author with id: ${authorId}`,
    );
    return savedPost;
  }

  async delete(id: string) {
    this.logger.log(`Deleting post with id: ${id}`);
    const result = await this.postRepository.softDelete(id);
    this.logger.log(`Deleted post with id: ${id}`);
    return result;
  }

  async comment(text: string, authorId: string, postId: string) {
    this.logger.log(
      `Creating a new comment for post with id: ${postId} by author with id: ${authorId}`,
    );
    const comment = this.commentRepository.create({
      text,
      post: { id: postId },
      author: { id: authorId },
    });
    const savedComment = await this.commentRepository.save(comment);
    this.logger.log(
      `Created a new comment with id: ${savedComment.id} for post with id: ${postId} by author with id: ${authorId}`,
    );
    return savedComment;
  }
}
