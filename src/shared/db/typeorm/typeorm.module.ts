import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from '@/shared/env/env.module';
import { EnvService } from '@/shared/env/env.service';
import { NODE_ENV } from '@/shared/env/env.validator';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        url: envService.get('DATABASE_URL'),
        synchronize: envService.get('NODE_ENV') === NODE_ENV.development,
        logging: envService.get('NODE_ENV') === NODE_ENV.development,
        logger: 'advanced-console',
        logNotifications: true,
      }),
    }),
  ],
})
export class OrmModule {}