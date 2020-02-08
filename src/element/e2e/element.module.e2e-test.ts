import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import * as request from 'supertest';
import { Connection } from './../../connection/entity/connection.entity';
import { dbConnectionOptions, getSampleData } from './../../utils/dbHelper';
import { ElementController } from './../element.controller';
import ElementDTO from './../Element.DTO';
import ElementRepo from './../element.repository';
import { ElementService } from './../element.service';
import { Element } from './../entity/element.entity';
import * as sampleData from './test_database.json';

require('custom-env').env('test');

const DATABASE = dbConnectionOptions(process.env.ORM_CONFIG_NAME);

describe('Element Get TEST', () => {
  let app: INestApplication;
  let elementService: ElementService;
  let elementRepository: ElementRepo;
  let elementsDTO: ElementDTO[];

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
    app = await module.createNestApplication();
    await app.init();

    elementService = module.get<ElementService>(ElementService);
    elementRepository = module.get<ElementRepo>(ElementRepo);

    elementsDTO = getSampleData(sampleData);
    await elementService.createElements(elementsDTO);
  });

  it('Check if Service Element is defined', async () => {
    expect(elementService).toBeDefined();
  });

  it('Check if Repository Element is defined', async () => {
    expect(elementRepository).toBeDefined();
  });

  it('Should check if inserted data are in tested database ', async () => {
    // arrange
    // act
    const elements: Element[] = await elementService.getAllElement();
    // test
    expect(elements.length).toBeGreaterThan(0);
    expect(elementsDTO.length).toEqual(elements.length);
  });

  it('Should return object with realtions', async () => {
    //act
    const data = await elementService.getAllElement();
    //test
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Array);
    expect(data[0]).toBeInstanceOf(Element);
    expect(data[0].connections).toBeInstanceOf(Array);
    expect(data[0].connections[0]).toBeInstanceOf(Connection);
  });

  it(`/GET elements`, async () => {
    const data = await elementService.getAllElement();
    const plainData = classToPlain(data);
    return await request(app.getHttpServer())
      .get('/element')
      .expect(plainData)
      .expect(200);
  });

  //TODO Test for getAllElement to check if return Connection

  it(`/GET element id=1 should return 200 HttpStatus ok - element id=1 exist`, async () => {
    // Act
    const data = await elementService.getElementAt(1);
    const plainData = classToPlain(data);
    // Test
    await request(app.getHttpServer())
      .get('/element/1')
      .expect(plainData)
      .expect(200);
  });

  it(`/GET element id=0 should return 204 NO CONTENT due element id=0 is not exist`, async () => {
    await request(app.getHttpServer())
      .get('/element/0')
      .expect(204)
      .expect({});
  });

  afterAll(async () => {
    await elementRepository.manager.connection.synchronize(true);
    await app.close();
  });
});

describe(`Element POST TEST`, () => {
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
    app = await module.createNestApplication();
    await app.init();

    elementService = module.get<ElementService>(ElementService);
    elementRepository = module.get<ElementRepo>(ElementRepo);
  });

  it('Database should be empty', async () => {
    const elements: ElementDTO[] = await elementService.getAllElement();
    expect(elements.length).toEqual(0);
  });

  it('Should insert a one Element without relations', async () => {
    // Arrange
    const elementDTO: ElementDTO = {
      name: 'Test Element',
      connections: [],
    };
    // ACT
    await elementService.createElement(elementDTO);
    const element: Element[] = await elementService.getAllElement();

    // Test
    expect(element).toBeInstanceOf(Array);
    expect(element[0].name).toEqual(elementDTO.name);
  });

  it('POST should create element and return in body ', async () => {
    const elementDTO: ElementDTO = {
      name: 'Test Element 2',
      connections: [],
    };

    const req = await request(app.getHttpServer())
      .post('/element')
      .send(elementDTO)
      .expect(201)
      .then(async res => {
        const element = await elementRepository.findOne({
          where: { name: elementDTO.name },
          relations: ['connections'],
        });
        expect(res.body).toEqual(element);
      });
  });
});
