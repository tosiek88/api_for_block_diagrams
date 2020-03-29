import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Element } from '../../element/entity/element.entity';

@Entity()
@Unique(['id'])
export class Connection {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    label: string;

    @Column()
    flow: 'input' | 'output';
    @ManyToMany(
        type => Element,
        element => element.connections,
        {
            onDelete: 'CASCADE',
        },
    )
    elements: Element[];
}
