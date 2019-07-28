import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementModule } from './element/element.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [ElementModule, TypeOrmModule.forRoot(), ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
