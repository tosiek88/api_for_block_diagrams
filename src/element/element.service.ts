import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, DeleteResult, Entity } from 'typeorm';
import { Element } from './entity/element.entity';
import { Connection } from '../connection/entity/connection.entity';
import { Logger } from '@nestjs/common';

import { plainToClass, plainToClassFromExist } from 'class-transformer';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}
  getElement(): string {
    return 'element';
  }

  async getAllElement(): Promise<Element[]> {
    return await this.elementRepository.find();
  }
  async createElement(element: Element): Promise<InsertResult> {
    // arg of function element is a plain object without constructor so need to be transformed
    // element contain other entity (element) so first convert them (array)
    const elementEntity = plainToClass(Element, element);
    elementEntity.connection = plainToClass(
      Connection,
      elementEntity.connection,
    );

    // end finally convert object
    elementEntity.connection = await this.connectionRepository.manager.save(
      elementEntity.connection,
    );
    await this.elementRepository.manager.save([elementEntity]);
    return new InsertResult();
  }

  async deleteAllElements(): Promise<DeleteResult> {
    Logger.log(Date.now());
    const allElements: Element[] = await this.getAllElement();
    Logger.log(allElements);
    const idElements: number[] = [];
    allElements.forEach(element => {
      idElements.push(element.id);
    });
    Logger.log(Date.now());
    return await this.elementRepository.delete(idElements);
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

  async assignConnectionToElement(connection: Connection, element: Element) {
    const el: Element = await this.getElementAt(element.id);
    // check if connection is already in database

    await el.connection.push(connection);
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
