import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../pages/appointment/appointment.entity';

@Entity({ name: 'Reason' })
export class Reason {
  @PrimaryGeneratedColumn()
  ID_reason!: number;

  @Column({ type: 'varchar', length: 150 })
  reason!: string;

  @Column({ type: 'enum', enum: ['m', 'h', "a"]})
  reasonSex!: string;

  @OneToMany(() => Appointment, (appointment) => appointment.reason)
  appointments!: Appointment[];

  @Column({type: "boolean", default: true})
  inUse!: boolean;
}