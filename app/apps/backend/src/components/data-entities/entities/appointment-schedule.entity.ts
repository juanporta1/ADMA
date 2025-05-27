import { Hours } from '../../pages/appointment/DTOs/appointment.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'AppointmentSchedule' })
export class AppointmentSchedule {
  @PrimaryGeneratedColumn()
  ID_appointmentSchedule!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'enum', enum: Hours })
  hour!: string;

  @Column({ type: 'int' })
  maxAppointments!: number;
}
