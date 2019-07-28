import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
