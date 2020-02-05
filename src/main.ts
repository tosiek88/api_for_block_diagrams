import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
const PORT = process.env.PORT || 8080;
async function bootstrap() {
  Logger.log(`DATABASE_NAME ${process.env.DATABASE_NAME}`);
  Logger.log(`NODE_ENV ${process.env.NODE_ENV}`);
  Logger.log('test');
  const app = await NestFactory.create(AppModule);
  Logger.log(`PORT: ${PORT}`);
  await app.listen(PORT);
  Logger.log(PORT);
}
bootstrap();
