import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionService } from '../connection/connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entity/connection.entity';
describe('ConnectionService', () => {
  let service: ConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Connection]),
      ],
      providers: [ConnectionService],
    }).compile();

    service = module.get<ConnectionService>(ConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
