import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, DeleteResult, Entity } from 'typeorm';
import { Element } from './element/element.entity';
import { Connection } from 'src/connection/connection.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}
  getElement(): string {
    return 'Element';
  }
  async createElement(element: Element): Promise<InsertResult> {
    const entityConnection: Connection = new Connection();
    entityConnection.id = 1;
    entityConnection.label = 'A2931';

    this.connectionRepository.manager.save([entityConnection]);
    const entity: Element = new Element();
    entity.name = 'Jbox981';
    entity.connection = [entityConnection];

    Logger.log(entity);
    Logger.log(element);
    element = element as Element;
    await this.elementRepository.manager.save([element]);
    return new InsertResult();
  }

  async getElementA(id: number): Promise<Element> {
    const element: Element = await this.elementRepository.findOne(id);
    return element;
  }
  async deleteElement(id: number): Promise<DeleteResult> {
    return await this.elementRepository.delete(id);
  }
}
