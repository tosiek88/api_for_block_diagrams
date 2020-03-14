import { Injectable, Logger } from '@nestjs/common';
import { Connection } from '../connection/entity/connection.entity';
import ElementDTO from './Element.DTO';
import ElementRepo from './element.repository';
import { Element } from './entity/element.entity';

type ElementDTOorError = ElementDTO | Error;
//TODO Create custom PIPE to map returned Element to plainObject
@Injectable()
export class ElementService {
  constructor(private readonly elementRepository: ElementRepo) {}
  getElement(): string {
    return 'element';
  }

  async getAllElement(): Promise<ElementDTO[]> {
    const result = await this.elementRepository.find({
      order: {
        id: 'ASC',
      },
      relations: ['connections'],
    }); // TODO should return ElementDTO[]
    return result;
  }

  async getElementByName(name: string): Promise<ElementDTO | []> {
    const elementDTO = this.elementRepository.findOneOverride({
      where: [
        {
          name: name,
        },
      ],
      relations: ['connections'],
    });
    return elementDTO;
  }
  async createElement(element: ElementDTO): Promise<ElementDTO | Error> {
    // arg of function element is a plain object without constructor so need to be transformed
    // element contain other entity (element) so first convert them (array)
    return await this.elementRepository.createElement(element);
  }

  async createElements(
    elementsDTO: ElementDTO[],
  ): Promise<ElementDTOorError[]> {
    const returnDTO: ElementDTO[] = [];
    for (const key in elementsDTO) {
      returnDTO.push(await this.createElement(elementsDTO[key]));
    }
    return returnDTO;
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

  private async checkIfExist(name?: string): Promise<Element | boolean> {
    await this.elementRepository.findOne({
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
