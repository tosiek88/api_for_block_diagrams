import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementModule } from './element/element.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './connection/connection.module';

import 'reflect-metadata';

@Module({
  imports: [ElementModule, TypeOrmModule.forRoot(), ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
// tslint:disable-next-line:no-console
export class AppModule {}
