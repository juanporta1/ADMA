import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { Veterinarian } from '../../data-entities/entities/veterinarian.entity';

@Entity({ name: 'IncomeForm' })
export class IncomeForm {
  @PrimaryGeneratedColumn()
  ID_income!: number;

  @OneToOne(() => Appointment)
  appointment!: Appointment;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.income, {
    nullable: true,
  })
  veterinarian?: Veterinarian | null;

  @Column({ type: 'varchar', nullable: true })
  age?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  animalName?: string | null;

  @Column({ type: 'float', nullable: true })
  weight?: number | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  features?: string | null;
}
