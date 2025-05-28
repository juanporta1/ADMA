import { Castration } from '../../pages/castration/castration.entity';
import { IncomeForm } from '../../pages/income-form/income-form.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Veterinarian' })
export class Veterinarian {
  @PrimaryGeneratedColumn()
  ID_veterinarian!: number;

  @OneToMany(() => Castration, (castration) => castration.veterinarian)
  castrations!: Castration[];

  @OneToMany(() => IncomeForm, (castration) => castration.veterinarian)
  income?: IncomeForm[];

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  lastName!: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'boolean', default: true })
  inUse!: boolean;
}
