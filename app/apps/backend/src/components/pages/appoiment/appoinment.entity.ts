import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status, Sex, Size, Reasons, Hours, Specie} from './appoinment-DTOs/appoiment.enum';

@Entity({ name: 'Appoinment' })
export class Appoinment {
  @PrimaryGeneratedColumn()
  ID_appoinment!: number;

  @Column({ type: 'varchar', length: 150 })
  owner!: string;

  @Column({ type: 'varchar', length: 150 })
  home!: string;

  @Column({ type: 'varchar', length: 50 })
  neighborhood!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'varchar' })
  dni!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({type: "enum", enum: Hours})
  hour!: string;

  @Column({ type: 'enum', enum: Size  })
  size!: string;

  @Column({ type: 'enum', enum: Sex })
  sex!: string;

  @Column({ type: 'enum', enum: Specie })
  specie!: string;

  @Column({ type: 'enum', default: 'Pendiente', enum: Status })
  status!: string;

  @Column({type: "varchar", length: 800, nullable: true})
  observations?: string;

  @Column({type: "enum", enum: Reasons, nullable: true})
  reason?: string
}
