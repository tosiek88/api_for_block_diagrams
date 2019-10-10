import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  InsertResult,
  DeleteResult,
  Entity,
  RelationQueryBuilder,
} from 'typeorm';
import { ElementRepository } from './element.repository';
import { Element } from './entity/element.entity';
import { Connection } from '../connection/entity/connection.entity';

import { plainToClass } from 'class-transformer';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: ElementRepository,
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}
  getElement(): string {
    return 'element';
  }

  async getAllElement(): Promise<Element[]> {
    return await this.elementRepository.find();
  }
  async createElement(element: Element): Promise<Element[] | Error> {
    // arg of function element is a plain object without constructor so need to be transformed
    // element contain other entity (element) so first convert them (array)
    const elementEntity = plainToClass(Element, element);
    if (element.connections === null) {
      return new Promise<Error>((resolve, reject) => {
        throw new Error('Conneciton is null');
      });
    }
    elementEntity.connections = plainToClass(
      Connection,
      elementEntity.connections,
    );
    // end finally convert object
    elementEntity.connections = await this.connectionRepository.manager.save(
      elementEntity.connections,
    );
    return await this.elementRepository.manager.save([elementEntity]);
  }

  async deleteAllElements(): Promise<Element[]> {
    const allElements: Element[] = await this.elementRepository.find();
    return await this.elementRepository.remove(allElements);
  }
  async updateElement(id: number, element: Element) {
    // check if Entity is in database
    // make validation of id - can be as Body or Param
    if (await this.elementRepository.findOneOrFail(id)) {
      return await this.elementRepository.save(element);
    } else {
      return false;
    }
  }

  private async checkIfExist(
    element?: Element,
    name?: string,
  ): Promise<Element | boolean> {
    const el: Element = await this.elementRepository.findOne({
      where: {
        name,
      },
    });

    return true;
  }

  async assignConnectionToElement(connection: Connection, element: Element) {
    const el: Element = await this.getElementAt(element.id);
    // check if connection is already in database

    await el.connections.push(connection);
    this.updateElement(el.id, el);
  }

  async getElementAt(id: number): Promise<Element> {
    const element: Element = await this.elementRepository.findOne(id);
    return element;
  }
  async deleteElement(id: number): Promise<Element> {
    const elementEntity: Element = await this.getElementAt(id);
    return await this.elementRepository.remove(elementEntity);
  }
}
