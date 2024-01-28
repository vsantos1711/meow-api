import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/app/user/user.module';
import { AuthModule } from '@/app/auth/auth.module';
import { PostModule } from './app/post/post.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
