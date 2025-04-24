import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";

@Entity({name:  "IncomeForm"})
export class IncomeForm{
    @PrimaryGeneratedColumn()
    ID_income!: number;

    @OneToOne(() => Appointment)
    @JoinColumn()
    appointment!: Appointment;

    @Column({type: "int", nullable: true})
    age?: number;

    @Column({type: "varchar",length: 30, nullable: true})
    animalName?: string;

    @Column({type: "float", nullable: true})
    weight?: number;

    @Column({type:  "varchar", length: 200, nullable: true})
    features?: string;

}