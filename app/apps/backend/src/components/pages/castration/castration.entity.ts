import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { Veterinarian } from '../../data-entities/entities/veterinarian.entity';

@Entity({ name: 'Castration' })
export class Castration {
  @PrimaryGeneratedColumn()
  ID_castration!: number;

  @OneToOne(() => Appointment, (a) => a.castration)
  appointment!: Appointment;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.castrations)
  veterinarian!: Veterinarian;

  @Column({ type: 'varchar' })
  age!: string;

  @Column({ type: 'varchar', length: 30 })
  animalName!: string;

  @Column({ type: 'float' })
  weight!: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  features?: string;

  @Column({ type: 'varchar', nullable: true })
  observations?: string;
}
