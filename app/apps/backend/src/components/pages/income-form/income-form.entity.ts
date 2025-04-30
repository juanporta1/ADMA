import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";

@Entity({name:  "IncomeForm"})
export class IncomeForm{
    @PrimaryGeneratedColumn()
    ID_income!: number;

    @OneToOne(() => Appointment)
    appointment!: Appointment;

    @Column({type: "varchar", nullable: true})
    age?: string | null;

    @Column({type: "varchar",length: 30, nullable: true})
    animalName?: string | null;

    @Column({type: "float", nullable: true})
    weight?: number | null;

    @Column({type:  "varchar", length: 200, nullable: true})
    features?: string | null;

}