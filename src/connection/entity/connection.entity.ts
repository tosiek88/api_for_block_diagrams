import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { Element } from '../../element/entity/element.entity';

@Entity()
@Unique(['label'])
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
  @ManyToMany(type => Element, element => element.connection)
  element?: Element[];
}
