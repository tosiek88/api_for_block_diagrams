import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { dbConnectionOptions } from './utils/return-connection-db-options';

const PORT = process.env.PORT || 8080;
async function bootstrap() {
  Logger.log(`NODE_ENV ${process.env.NODE_ENV}`);
  const app = await NestFactory.create(AppModule);
  Logger.log(`PORT: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
