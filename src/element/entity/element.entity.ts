import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Connection } from '../../connection/entity/connection.entity';

@Entity()
// @Unique(['name'])
export class Element {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Connection,
        input => input.elements,
        {
            onDelete: 'CASCADE',
            cascade: ['update', 'insert'],
            nullable: true,
        },
    )
    @JoinTable()
    input: Connection[];

    @ManyToMany(
        type => Connection,
        output => output.elements,
        {
            onDelete: 'CASCADE',
            cascade: ['update', 'insert'],
            nullable: true,
        },
    )
    @JoinTable()
    output: Connection[];
}
