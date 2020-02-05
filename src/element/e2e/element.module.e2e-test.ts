import ElementRepo from './../element.repository';
import { Element } from './../entity/element.entity';
import ElementDTO from './../Element.DTO';
import { ElementService } from './../element.service';
import { ElementController } from './../element.controller';

import { Connection } from './../../connection/entity/connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { dbConnectionOptions, getSampleData, cleanDatabase } from './../../utils/dbHelper';
import { async } from 'rxjs/internal/scheduler/async';

const DATABASE = dbConnectionOptions(process.env.NODE_ENV);
const DATABASE_NAME = process.env.DATABASE_NAME;
describe('Element', () => {
    Logger.log(`E2E Test against database: ${process.env.DATABASE_NAME}`);
    let app: INestApplication;
    let elementService: ElementService;
    let elementRepository: ElementRepo;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(DATABASE),
                TypeOrmModule.forFeature([Element, ElementRepo]),
                TypeOrmModule.forFeature([Connection]),
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
        const elementDTO: ElementDTO[] = getSampleData();
        // act
        await elementService.createElement( elementDTO[0]);
        const elements: Element[] = await elementService.getAllElement();
        // test
        expect(elements.length).toBeGreaterThan(0);
    });

    it(`/GET elements`, () => {
        return request(app.getHttpServer())
            .get('/element')
            .expect(200);
    });

    afterAll( async () => {
        await cleanDatabase<Element>(elementRepository, DATABASE_NAME);
        await app.close();
    });
});
