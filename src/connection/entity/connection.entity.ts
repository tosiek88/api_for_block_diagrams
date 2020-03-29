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

    @ManyToMany(
        type => Element,
        element => element.input,
        {
            onDelete: 'CASCADE',
        },
    )
    @ManyToMany(
        type => Element,
        element => element.output,
        {
            onDelete: 'CASCADE',
        },
    )
    elements: Element[];
}
