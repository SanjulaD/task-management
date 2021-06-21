/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Unique } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;

  @Column()
  user_status_id: number;

  async validatePassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
