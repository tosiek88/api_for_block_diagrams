import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from './entity/element.entity';
import { Connection } from '../connection/entity/connection.entity';

import ElementDTO from './Element.DTO';
import ConnectionDTO from '../connection/connection.DTO';
import ElementRepo from './element.repository';

@Injectable()
export class ElementService {
  constructor(
    private readonly elementRepository: ElementRepo,
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}
  getElement(): string {
    return 'element';
  }

  async getAllElement(): Promise<Element[]> {
    return await this.elementRepository.find();
  }
  async createElement(element: ElementDTO): Promise<ElementDTO | Error> {
    // arg of function element is a plain object without constructor so need to be transformed
    // element contain other entity (element) so first convert them (array)
    try {
      return await this.elementRepository.createElement(element);
    } catch (error) {
      throw new Error(error);
    }
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
