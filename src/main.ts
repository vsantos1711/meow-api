import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { createLogger, transports, format, Logger } from 'winston'
import { GlobalExceptionFilter } from './shared/utils/filters/global-exceptions.filter';
import { EnvService } from './shared/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = createLogger({
    transports: [
      new transports.File({ filename: 'logs/logs.log', level: 'log' }), 
      new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    ],
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json())
  })
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  app.enableCors({
    origin: '*',
  });
  await app.listen(port, () =>
    console.log(`🐱 Server is running on port ${port}`),
  );
}
bootstrap();
