import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as data from '../../ormconfig.json';
import * as sampleData from '../utils/test_database.json';
import { Logger } from '@nestjs/common';
import ElementDTO from '../element/Element.DTO';
export function dbConnectionOptions(dbName: string): TypeOrmModuleOptions {
    const DATABASE = data.find(e => e.name === dbName);
    if (DATABASE === undefined) {
        return {}; // in this case TypeOrm Should take default config from ormconfig.json
    } else {
        DATABASE.name = '';
        return DATABASE as TypeOrmModuleOptions;
    }
}

export function getSampleData(): ElementDTO {
    Logger.log(sampleData);
    const {id, name, connections} = sampleData[0];
    const obj: ElementDTO = new ElementDTO();
    obj.id = id;
    obj.name = name;
    obj.connections = connections;
    return obj;
}
