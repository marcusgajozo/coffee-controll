import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Plan } from "./Plan";

@Entity()
export class Signature {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column()
  id_user: string;

  @Column("int")
  durationMonths: number;

  @Column()
  active: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
