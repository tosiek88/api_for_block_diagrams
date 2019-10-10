import { Element } from './entity/element.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Element)
export class ElementRepository extends Repository<Element> {}
