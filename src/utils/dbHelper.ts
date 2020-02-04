import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as data from '../../ormconfig.json';
import * as sampleData from '../utils/test_database.json';

export function dbConnectionOptions(dbName: string): TypeOrmModuleOptions {
  const DATABASE = data.find(e => e.name === dbName);
  if (DATABASE === undefined) {
    return {}; // in this case TypeOrm Should take default config from ormconfig.json
  } else {
    DATABASE.name = '';
    return DATABASE as TypeOrmModuleOptions;
  }
}

<<<<<<< Updated upstream
export function getSampleData() {
  const obj = sampleData;
  Logger.log(sampleData);
=======
export function getSampleData(): object {
  return sampleData;
>>>>>>> Stashed changes
}
