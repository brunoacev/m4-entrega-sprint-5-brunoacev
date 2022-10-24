import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Addresses } from "./Addresses.entity";
import { Categories } from "./Categories.entity";
import { Schedules_users_properties } from "./Schedules_users_properties";

@Entity()
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column()
  value: number;

  @Column({ type: "int" })
  size: number;

  @OneToOne((type) => Addresses, {
    eager: true,
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  address: Addresses;

  @ManyToOne((type) => Categories, (categories) => categories.properties, {
    onDelete: "SET NULL",
    eager: true,
  })
  category: Categories;

  @OneToMany(
    (type) => Schedules_users_properties,
    (schedules_users_properties) => schedules_users_properties.property,
    { eager: true }
  )
  schedules: Schedules_users_properties[];

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
