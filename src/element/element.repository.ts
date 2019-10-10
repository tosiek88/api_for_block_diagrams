import { Element } from './entity/element.entity';
import { EntityRepository, Repository } from 'typeorm';
import ElementDTO from './Element.DTO';

@EntityRepository(Element)
export class ElementRepository extends Repository<Element> {
  public createElement(ElementDTO: ElementDTO) {}
}
