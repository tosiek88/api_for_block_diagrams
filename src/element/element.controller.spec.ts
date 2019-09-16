import { Test, TestingModule } from '@nestjs/testing';
import { ElementController } from '../element/element.controller';
import { ElementModule } from './element.module';
import { ElementService } from './element.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from '../connection/entity/connection.entity';
import { Element } from './entity/element.entity';

describe('Element Controller', () => {
  let controller: ElementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Element, Connection]),
      ],
      controllers: [ElementController],
      providers: [ElementService],
    }).compile();

    controller = module.get<ElementController>(ElementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
