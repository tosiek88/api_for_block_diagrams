import { Logger } from '@nestjs/common';
import 'automapper-ts';
import { EntityRepository, Repository } from 'typeorm';
import ElementDTO from './Element.DTO';
import { Element } from './entity/element.entity';

@EntityRepository(Element)
export default class ElementRepo extends Repository<Element> {
  constructor() {
    super();
  }
  public async createElement(elementDTO: ElementDTO): Promise<ElementDTO> {
    let elementEntity = new Element();
    automapper
      .createMap('ConnectionDTO', 'Connection')
      .forAllMembers((dest: any, destProp: string, value: any): void => {
        dest[destProp] = value;
      });

    automapper
      .createMap('ElementDTO', 'Element')
      .forAllMembers((dest: any, destProp: string, value: any): void => {
        dest[destProp] = value;
      });
    // .forMember('connections', opt => {
    //   Logger.log(opt);
    // });

    elementEntity = automapper.map('ElementDTO', 'Element', elementDTO);
    const entity = await this.save([elementEntity]);
    elementDTO.id = entity[0].id;
    return elementDTO;
  }
}
