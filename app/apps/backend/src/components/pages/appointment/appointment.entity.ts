import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status, Sex, Size, Hours } from './DTOs/appointment.enum';
import { Reason } from '../../data-entities/entities/reason.entity';
import { Specie } from '../../data-entities/entities/specie.entity';
import { Neighborhood } from '../../data-entities/entities/neighborhood.entity';
import { IncomeForm } from '../income-form/income-form.entity';
import { Castration } from '../castration/castration.entity';
import { User } from '../../data-entities/entities/user.entity';

@Entity({ name: 'Appointment' })
export class Appointment {
  @PrimaryGeneratedColumn()
  ID_appointment!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  lastName!: string;

  @Column({ type: 'varchar', length: 150 })
  home!: string;

  @ManyToOne(() => Neighborhood, (neighborhood) => neighborhood.appointments)
  neighborhood!: Neighborhood;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'varchar' })
  dni!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'enum', enum: Hours })
  hour!: string;

  @Column({ type: 'enum', enum: Size })
  size!: string;

  @Column({ type: 'enum', enum: Sex })
  sex!: string;

  @ManyToOne(() => Specie, (specie) => specie.appointments)
  specie!: Specie;

  @Column({ type: 'enum', default: 'Pendiente', enum: Status })
  status!: string;

  @Column({ type: 'varchar', length: 800, nullable: true })
  observations?: string;

  @ManyToOne(() => Reason, (reasons) => reasons.appointments)
  reason!: Reason;

  @Column({ type: 'int', nullable: true })
  surgeryNumber?: number | null;
  @Column({ type: 'bool', default: false })
  mobile!: boolean;

  @OneToOne(() => IncomeForm, (i) => i.appointment, { nullable: true })
  @JoinColumn()
  incomeForm?: IncomeForm | null;

  @OneToOne(() => Castration, (c) => c.appointment, { nullable: true })
  @JoinColumn()
  castration?: Castration;

  @ManyToOne(() => User, (user) => user.appointment)
  user!: User;
}
