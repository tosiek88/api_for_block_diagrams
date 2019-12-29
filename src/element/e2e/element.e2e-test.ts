import { Element } from './../entity/element.entity';
import { Connection } from './../../connection/entity/connection.entity';
import { ElementService } from './../element.service';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ElementRepo from '../element.repository';

describe('Element', () => {
  let app: INestApplication;
  const elementService = { getElement: () => 'element' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([Element, Connection]),
      ],
      providers: [
        ElementService,
        {
          // https://github.com/nestjs/nest/issues/1229
          provide: ElementRepo,
          useClass: ElementRepo,
        },
        {
          provide: `${getRepositoryToken(Connection)}Repository`,
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET elements`, () => {
    return request(app.getHttpServer())
      .get('/element')
      .expect(200)
      .expect({
        data: elementService.getElement(),
      });
  });
});
