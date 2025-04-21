import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../pages/appoiment/appointment.entity';

@Entity({ name: 'Reason' })
export class Reason {
  @PrimaryGeneratedColumn()
  ID_reason!: number;

  @Column({ type: 'varchar', length: 150 })
  reason!: string;

  @OneToMany(() => Appointment, (appointment) => appointment.reason)
  appointments!: Appointment[];
}