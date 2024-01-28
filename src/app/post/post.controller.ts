import { Controller } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('user')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
