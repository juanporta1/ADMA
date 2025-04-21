import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../pages/appoiment/appointment.entity';

@Entity({ name: 'Neighborhood' })
export class Neighborhood {
  @PrimaryGeneratedColumn()
  ID_neighborhood!: number;

  @Column({ type: 'varchar', length: 150 })
  neighborhood!: string;

  @OneToMany(() => Appointment, (appointment) => appointment.neighborhood)
  appointments!: Appointment[];
}