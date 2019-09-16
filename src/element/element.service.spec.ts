import { Test, TestingModule } from '@nestjs/testing';
import { ElementService } from '../element/element.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entity/element.entity';
import { Connection } from '../connection/entity/connection.entity';
describe('ElementService', () => {
  let service: ElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Element, Connection]),
      ],
      providers: [ElementService],
    }).compile();

    service = module.get<ElementService>(ElementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
