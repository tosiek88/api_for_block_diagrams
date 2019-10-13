import { Connection } from '../connection/entity/connection.entity';
import { Element } from './entity/element.entity';
import { EntityRepository, Repository } from 'typeorm';
import ElementDTO from './Element.DTO';

@EntityRepository(Element)
export default class ElementRepo extends Repository<Element> {
  constructor() {
    super();
  }
  // tslint:disable-next-line: no-shadowed-variable
  public async createElement(elementDTO: ElementDTO): Promise<ElementDTO> {
    const elementEntity = new Element();
    elementEntity.name = elementDTO.name;
    elementEntity.connections = [];

<<<<<<< HEAD
    if (elementDTO.connections !== undefined) {
      elementDTO.connections.forEach(it => {
        const tempConn: Connection = new Connection();
        tempConn.id = it.id;
        tempConn.label = it.label;
        tempConn.elements = [];

        elementEntity.connections.push(tempConn);
      });
    } else {
      elementDTO.connections = [];
    }
    try {
      await this.save([elementEntity]);
=======
      elementEntity.connections.push(tempConn);
    });
    await this.save([elementEntity]);
>>>>>>> New request for testing purpose

    return elementDTO;
  }
}
