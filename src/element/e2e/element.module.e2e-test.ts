import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import * as request from 'supertest';
import { Connection } from './../../connection/entity/connection.entity';
import {
  cleanDatabase,
  dbConnectionOptions,
  getSampleData,
} from './../../utils/dbHelper';
import { ElementController } from './../element.controller';
import ElementDTO from './../Element.DTO';
import ElementRepo from './../element.repository';
import { ElementService } from './../element.service';
import { Element } from './../entity/element.entity';
import * as sampleData from './test_database.json';

require('custom-env').env('test');

const DATABASE = dbConnectionOptions(process.env.ORM_CONFIG_NAME);

describe('Element', () => {
  Logger.log(`E2E Test against database: ${DATABASE.database}`);
  let app: INestApplication;
  let elementService: ElementService;
  let elementRepository: ElementRepo;

  // TODO metadata can be stored somewhere else
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(DATABASE),
        TypeOrmModule.forFeature([Element, ElementRepo, Connection]),
      ],
      controllers: [ElementController],
      providers: [ElementService],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    elementService = module.get<ElementService>(ElementService);
    elementRepository = module.get<ElementRepo>(ElementRepo);
  });

  it('Check if Service Element is defined', async () => {
    expect(elementService).toBeDefined();
  });

  it('Check if Repository Element is defined', async () => {
    expect(elementRepository).toBeDefined();
  });

  it('Check if Service Element will work', async () => {
    // arrange
    const elementDTO: ElementDTO[] = getSampleData(sampleData);
    // act
    await elementService.createElement(elementDTO[0]);
    const elements: Element[] = await elementService.getAllElement();
    // test
    expect(elements.length).toBeGreaterThan(0);
  });

  it(`/GET elements`, async () => {
    const data = await elementService.getAllElement();
    const plainData = classToPlain(data);
    return await request(app.getHttpServer())
      .get('/element')
      .expect(plainData)
      .expect(200);
  });

  it(`/GET element id=1`, async () => {
    const data = await elementService.getElementAt(1);
    const plainData = classToPlain(data);
    return await request(app.getHttpServer())
      .get('/element/1')
      .expect(plainData)
      .expect(200);
  });

  it(`/GET element id=0 should return 204 NO CONTENT due element id=0 is not exist`, async () => {
    const req = await request(app.getHttpServer())
      .get('/element/0')
      .expect(204)
      .expect({});
    return req;
  });

  afterAll(async () => {
    await cleanDatabase<Element>(
      elementRepository,
      DATABASE.database.toString(),
    );
    await app.close();
  });
});
