import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementModule } from './element/element.module';
import { ConnectionModule } from './connection/connection.module';

Module({
  imports: [ElementModule, ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
});
// tslint:disable-next-line:no-console
export class AppModule {}
