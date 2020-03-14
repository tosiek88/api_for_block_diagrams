import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from './entity/connection.entity';
import {
  Repository,
  InsertResult,
  DeleteResult,
  FindConditions,
} from 'typeorm';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  async createConnection(connection: Connection): Promise<InsertResult> {
    return await this.connectionRepository.insert(connection);
  }

  async getAll(): Promise<Connection[]> {
    const connections: Connection[] = await this.connectionRepository.find();
    return connections;
  }
  async deleteConnection(id: number): Promise<DeleteResult> {
    return await this.connectionRepository.delete(id);
  }

  async deleteConnections(): Promise<Connection[]> {
    const allConnections: Connection[] = await this.connectionRepository.find();
    return await this.connectionRepository.remove(allConnections);
  }
}
