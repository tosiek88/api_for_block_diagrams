import { Connection } from '../connection/entity/connection.entity';
import { Element } from './entity/element.entity';
import { EntityRepository, Repository } from 'typeorm';
import ElementDTO from './Element.DTO';
import { Injectable } from '@nestjs/common';

@EntityRepository(Element)
export default class CustomRepo extends Repository<Element> {
  constructor() {
    super();
  }
  // tslint:disable-next-line: no-shadowed-variable
  public async createElement(elementDTO: ElementDTO): Promise<ElementDTO> {
    const elementEntity = new Element();
    elementEntity.name = elementDTO.name;
    elementEntity.connections = [];
    elementDTO.connections.forEach(it => {
      const tempConn: Connection = new Connection();
      tempConn.id = it.id;
      tempConn.label = it.label;
      tempConn.elements = [];

      elementEntity.connections.push(tempConn);
    });
    elementEntity.connections = await this.manager.save(
      elementEntity.connections,
    );
    try {
      await this.save([elementEntity]);

      return elementDTO;
    } catch (err) {
      throw new Error('Cannot save Entity');
    }
  }
}
