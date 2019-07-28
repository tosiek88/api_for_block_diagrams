import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { Element } from './element/element.entity';
@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
  ) {}
  getElement(): string {
    return 'Element';
  }
  async createElement(element: Element): Promise<InsertResult> {
    return await this.elementRepository.insert(element);
  }
  async getElementA(id: number): Promise<Element> {
    const element: Element = await this.elementRepository.findOne(id);
    return element;
  }
}
