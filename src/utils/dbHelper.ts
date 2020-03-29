import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as data from '../../ormconfig.json';
import ElementDTO from '../element/Element.DTO';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

export function dbConnectionOptions(dbName: string): TypeOrmModuleOptions {
    const DATABASE = data.find(e => e.name === dbName);
    if (DATABASE === undefined) {
        return {}; // in this case TypeOrm Should take default config from ormconfig.json
    } else {
        DATABASE.name = '';
        return DATABASE as TypeOrmModuleOptions;
    }
}

export function getSampleData(sampleData: any): ElementDTO[] {
    const elementsDTO: ElementDTO[] = [];
    for (const key in sampleData) {
        const { id, name, input, output } = sampleData[key];
        const obj: ElementDTO = new ElementDTO();

        obj.id = id;
        obj.name = name;
        obj.input = input;
        obj.output = output;
        elementsDTO.push(obj);
    }
    return elementsDTO;
}

export async function cleanDatabase<T>(repo: Repository<T>, database: string) {
    // DROP DATABASE to have fresh start for next tests
    await repo.query(`DROP DATABASE ${database}`);
    await repo.query(`CREATE DATABASE ${database}`);
}
