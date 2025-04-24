import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";

@Entity({name:  "Castration"})
export class Castration{
    @PrimaryGeneratedColumn()
    ID_castration!: number;

    @OneToOne(() => Appointment)
    @JoinColumn()
    appointment!: Appointment;

    @Column({type: "int"})
    age!: number;

    @Column({type: "varchar",length: 30})
    animalName!: string;

    @Column({type: "float"})
    weight!: number;

    @Column({type:  "varchar", length: 200})
    features!: string;

}