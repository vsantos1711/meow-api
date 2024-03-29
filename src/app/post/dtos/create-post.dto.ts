import { CommentEntity } from '@/domain/entities/post.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  catName: string;

  @IsString()
  @IsNotEmpty()
  catAge: string;

  @IsString()
  @IsNotEmpty()
  catBreed: string;

  @IsString()
  @IsNotEmpty()
  catWeight: string;

  @IsOptional()
  views: number;

  @IsOptional()
  @IsString()
  authorId: string;

  @IsOptional()
  comments: CommentEntity[];
}
