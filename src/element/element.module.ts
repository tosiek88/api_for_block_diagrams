import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { Element } from './element/element.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Element])],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
