import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementModule } from './element/element.module';

@Module({
  imports: [ElementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
