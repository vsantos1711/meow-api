import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '@/infra/prisma/prisma.module';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
