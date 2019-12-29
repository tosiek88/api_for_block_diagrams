import ElementRepo from './../element.repository';
import { Element } from './../entity/element.entity';
import { ElementService } from './../element.service';
import { ElementController } from './../element.controller';

import { Connection } from './../../connection/entity/connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { dbConnectionOptions } from '../../utils/return-connection-db-options';
describe('Element', () => {
  let app: INestApplication;
  let elementService: ElementService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dbConnectionOptions('test')),
        TypeOrmModule.forFeature([Element, ElementRepo]),
        TypeOrmModule.forFeature([Connection]),
      ],
      controllers: [ElementController],
      providers: [ElementService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    elementService = module.get<ElementService>(ElementService);
  });

  it('Check if Service Element will work', () => {});

  it(`/GET elements`, () => {
    return request(app.getHttpServer())
      .get('/element')
      .expect(200);
  });
});
