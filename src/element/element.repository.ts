import { Element } from './entity/element.entity';
import { EntityRepository, Repository } from 'typeorm';
import ElementDTO from './Element.DTO';

@EntityRepository(Element)
export class ElementRepository extends Repository<Element> {
  // tslint:disable-next-line: no-shadowed-variable
  public async createElement(ElementDTO: ElementDTO): Promise<ElementDTO> {
    const elementEntity = new Element();
    elementEntity.name = ElementDTO.name;
    ElementDTO.connections.forEach(it => {
      elementEntity.connections.push(it);
    });
    elementEntity.connections = await this.manager.save(
      elementEntity.connections,
    );
    try {
      await this.manager.save([elementEntity]);

      return ElementDTO;
    } catch (err) {
      throw new Error('Cannot save Entity');
    }
  }
}
