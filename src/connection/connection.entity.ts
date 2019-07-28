import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Element } from 'src/element/element/element.entity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
  @ManyToMany(type => Element, element => element.connection)
  element?: Element[];
}
