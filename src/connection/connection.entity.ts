import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
}
