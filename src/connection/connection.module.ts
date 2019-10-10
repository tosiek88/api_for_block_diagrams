import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entity/connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  providers: [ConnectionService],
  controllers: [ConnectionController],
})
export class ConnectionModule {}
