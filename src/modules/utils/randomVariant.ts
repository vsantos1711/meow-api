import { PostEntity } from '@/domain/entities/post.entity';

export function addRandomVariant(postList: PostEntity[]): PostEntity[] {
  const variantOptions = ['top-right', 'top-left', 'bot-right', 'bot-left'];
  const randomIndex = Math.floor(Math.random() * postList.length);

  postList[randomIndex].variant =
    variantOptions[Math.floor(Math.random() * variantOptions.length)];

  return postList;
}
