import ElementRepo from './../element.repository';
import { Element } from './../entity/element.entity';
import ElementDTO from './../Element.DTO';
import { ElementService } from './../element.service';
import { ElementController } from './../element.controller';

import { Connection } from './../../connection/entity/connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
<<<<<<< HEAD
import { dbConnectionOptions, getSampleData } from '../../utils/dbHelper';
=======
import { dbConnectionOptions, getSampleData } from './../../utils/dbHelper';
import { EntityManager } from 'typeorm';
>>>>>>> master

const DATABASE = dbConnectionOptions(process.env.NODE_ENV);
const DATABASE_NAME = process.env.DATABASE_NAME;
describe('Element', () => {
    let app: INestApplication;
    Logger.log(DATABASE);
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

    const cleanDatabase = async () => {
        // DROP DATABASE to have fresh start for next tests
        let result = await elementRepository.query(
            `DROP DATABASE ${DATABASE_NAME}`,
        );
        Logger.log(result, `DROP DATABASE`);
        result = await elementRepository.query(`CREATE DATABASE ${DATABASE_NAME}`);

        Logger.log(result, `--------END---------`);
        // close all connection after tests;
        await app.close();
    };

    afterAll(cleanDatabase);

    it('Check if Service Element will work', async () => {
        expect(elementService).toBeDefined();
        expect(elementRepository).toBeDefined();
        Logger.log(`ACT`, 'Test of createElement');

<<<<<<< HEAD
    let elementDTO: ElementDTO = new ElementDTO();
    elementDTO = getSampleData() as ElementDTO;
    Logger.log(elementDTO);
    const result = await elementService.createElement(elementDTO[0]);
    Logger.log(result, 'Test of elementService.createElement');
    const elements: Element[] = await elementService.getAllElement();
    expect(elements.length).toBeGreaterThan(0);
  });
=======
        let elementDTO: ElementDTO = new ElementDTO();
        elementDTO = getSampleData(); //TODO have to use automapper
        Logger.log(elementDTO);
        const result = await elementService.createElement(elementDTO);
        Logger.log(result, 'Test of elementService.createElement');
        const elements: Element[] = await elementService.getAllElement();
        expect(elements.length).toBeGreaterThan(0);
    });
>>>>>>> master

    it(`/GET elements`, () => {
        return request(app.getHttpServer())
            .get('/element')
            .expect(200);
    });
});
