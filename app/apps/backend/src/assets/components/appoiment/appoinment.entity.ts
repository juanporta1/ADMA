import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status, Race, Sex, Size} from './appoinment-DTOs/appoiment.enum';

@Entity({ name: 'Appoinment' })
export class Appoinment {
  @PrimaryGeneratedColumn()
  ID_appoinment!: number;

  @Column({ type: 'varchar', length: 50 })
  owner!: string;

  @Column({ type: 'varchar', length: 75 })
  home!: string;

  @Column({ type: 'varchar', length: 50 })
  neighborhood!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'varchar' })
  dni!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'enum', enum: Size  })
  size!: string;

  @Column({ type: 'enum', enum: Sex })
  sex!: string;

  @Column({ type: 'enum', enum: Race })
  race!: string;

  @Column({ type: 'enum', default: 'Pendiente', enum: Status })
  status!: string;
}
