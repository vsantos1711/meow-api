import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { isPublic } from '../decorators/public.decorator';
import { RequestInterface } from '../auth/interfaces';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @isPublic()
  @Get('findAll')
  async findAll() {
    return this.postService.findAll();
  }

  @Get('findByAuthor')
  async findByAuthor(@Req() req: RequestInterface) {
    return this.postService.findByAuthor(req.user.sub);
  }

  @Post('create')
  async create(@Body() post: CreatePostDto, @Req() req: RequestInterface) {
    const authorId = req.user.sub;
    return this.postService.create(post, authorId);
  }

  @Post('delete/:id')
  async delete(id: string) {
    return this.postService.delete(id);
  }
}
