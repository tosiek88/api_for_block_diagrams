import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { Element } from './entity/element.entity';
import { Connection } from '../connection/entity/connection.entity';
import ElementRepo from './element.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Element, ElementRepo]),
    TypeOrmModule.forFeature([Connection]),
  ],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
