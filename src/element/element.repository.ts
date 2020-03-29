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

    public async createElement(
        elementDTO: ElementDTO,
    ): Promise<ElementDTO | Error> {
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

        elementEntity = automapper.map('ElementDTO', 'Element', elementDTO);
        try {
            const entity = await this.save([elementEntity]);
            Logger.log(entity, `AUTOMAPPER Create Element`);
            elementDTO.id = entity[0].id;
            return elementDTO;
        } catch (err) {
            Logger.log(`AUTOMAPPER Throw`);
            const error: Error = {
                message: err.sqlMessage,
                name: err.code,
            };
            return error;
        }
    }

    public async findOneOverride(
        findManyOptions?: any,
    ): Promise<ElementDTO | []> {
        automapper
            .createMap('Element', 'ElementDTO')
            .forAllMembers((dest: any, destProp: string, value: any): void => {
                dest[destProp] = value;
            });

        const result = await this.findOne(findManyOptions);
        let elementDTO = new ElementDTO();
        elementDTO = automapper.map('Element', 'ElementDTO', result);
        if (elementDTO === undefined) {
            return [];
        } else {
            return elementDTO;
        }
    }
}
