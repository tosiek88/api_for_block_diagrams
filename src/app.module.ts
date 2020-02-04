import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementModule } from './element/element.module';
import { ConnectionModule } from './connection/connection.module';
import 'dotenv/config';
import { dbConnectionOptions } from './utils/dbHelper';

const DATABASE = dbConnectionOptions(process.env.NODE_ENV);
Logger.log(DATABASE);
@Module({
    imports: [TypeOrmModule.forRoot(DATABASE), ElementModule, ConnectionModule],
    controllers: [AppController],
    providers: [AppService],
})
// tslint:disable-next-line:no-console
export class AppModule { }
