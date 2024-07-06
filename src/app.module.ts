import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { envSchema } from './shared/env/env.validator';
import { EnvModule } from './shared/env/env.module';
import { OrmModule } from './shared/db/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    OrmModule,
    UserModule,
    AuthModule,
    PostModule,
  ],
})
export class AppModule {}
