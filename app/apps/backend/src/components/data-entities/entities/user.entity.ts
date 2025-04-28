import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../pages/appointment/appointment.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  ID_user!: number;

  @Column({type: "varchar"})
  email!: string;

  @Column({type: "enum", enum: ["admin", "user", "main"]})
  role!: string;

  @Column({type: "boolean", default: true})
  inUse!: boolean;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointment!: Appointment;
}