import ElementRepo from './../element.repository';
import { Element } from './../entity/element.entity';
import ElementDTO from './../Element.DTO';
import { ElementService } from './../element.service';
import { ElementController } from './../element.controller';
import { Connection } from './../../connection/entity/connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
require('custom-env').env('test');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import * as request from 'supertest';
import {
  cleanDatabase,
  dbConnectionOptions,
  getSampleData,
} from './../../utils/dbHelper';
import * as sampleData from './test_database.json';
const DATABASE = dbConnectionOptions(process.env.ORM_CONFIG_NAME);

describe('Element', () => {
  Logger.log(`E2E Test against database: ${DATABASE.database}`);
  let app: INestApplication;
  let elementService: ElementService;
  let elementRepository: ElementRepo;

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
    return request(app.getHttpServer())
      .get('/element')
      .expect(plainData)
      .expect(200);
  });

  afterAll(async () => {
    await cleanDatabase<Element>(
      elementRepository,
      DATABASE.database.toString(),
    );
    // Logger.log(DATABASE.database.toString(), `CLEANING`);
    await app.close();
  });
});
