import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Properties } from "./Properties.entity";
import { Users } from "./Users.entity";

@Entity()
export class Schedules_users_properties {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  date: string;

  @Column()
  hour: string;

  @ManyToOne((type) => Users, (users) => users.schedules_users_properties, {
    onDelete: "CASCADE",
    nullable: false,
    eager: true,
  })
  user: Users;

  @ManyToOne((type) => Properties, (properties) => properties.schedules, {
    onDelete: "CASCADE",
    nullable: false,
  })
  property: Properties;
}
