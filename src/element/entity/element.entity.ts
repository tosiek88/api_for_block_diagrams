import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Connection } from '../../connection/entity/connection.entity';

@Entity()
@Unique(['name'])
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    type => Connection,
    connection => connection.elements,
    {
      onDelete: 'CASCADE',
      cascade: ['update', 'insert'],
    },
  )
  @JoinTable()
  connections: Connection[];
}
