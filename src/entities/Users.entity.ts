import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Schedules_users_properties } from "./Schedules_users_properties";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column()
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @Column({ length: 128 })
  password: string;

  @OneToMany(
    (type) => Schedules_users_properties,
    (schedules_users_properties) => schedules_users_properties.user
  )
  schedules_users_properties: Schedules_users_properties[];

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
