import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.entity';

@Controller('connection')
export class ConnectionController {
  public constructor(private readonly connectionService: ConnectionService) {}
  @Get()
  public home() {
    return 'connection';
  }
  @Get('all')
  public getAllConnection() {
    return this.connectionService.getAll();
  }
  @Post()
  public createConnection(@Body() connection: Connection) {
    return this.connectionService.createConnection(connection);
  }
  @Delete(':id')
  public deleteConnection(@Param() params) {
    this.connectionService.deleteConnection(params.id);
  }
}
