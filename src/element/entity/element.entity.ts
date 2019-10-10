import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Connection } from '../../connection/entity/connection.entity';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Connection, connection => connection.elements, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  connections?: Connection[];
}
