import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionController } from '../connection/connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './connection.entity';
import { ConnectionService } from './connection.service';
describe('Connection Controller', () => {
  let controller: ConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Connection]),
      ],

      controllers: [ConnectionController],
      providers: [ConnectionService],
    }).compile();

    controller = module.get<ConnectionController>(ConnectionController);
  });

  it('should be defined', () => {});
});
