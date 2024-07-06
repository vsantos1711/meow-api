import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { isPublic } from '../auth/decorators/public.decorator';
import { RequestInterface } from '../auth/interfaces/request';
import { LoggedInUser } from '../auth/decorators/logged-in-user.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @isPublic()
  @Get('listAll')
  async findAll() {
    return this.postService.findAll();
  }

  @Get('listByAuthor')
  async findByAuthor(@LoggedInUser('sub') userId: string) {
    return this.postService.findByAuthor(userId);
  }

  @Post('create')
  async create(@Body() post: CreatePostDto, @LoggedInUser('sub') authorId: string) {
    return this.postService.create(post, authorId);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }

  @Post('comment/:id')
  async comment(
    @Body() comment: { text: string },
    @LoggedInUser('sub') authorId: string,
    @Param('id') postId: string,
  ) {
    return this.postService.comment(comment.text, authorId, postId);
  }
}
