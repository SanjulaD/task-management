/* eslint-disable prettier/prettier */
import { Column } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  user_id: number;

  @Column()
  task_status_id: number;
}
