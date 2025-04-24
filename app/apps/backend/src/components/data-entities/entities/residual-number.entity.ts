import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "ResidualNumber"})
export class ResidualNumber{
    @PrimaryGeneratedColumn()
    ID_residualNumber!: number;

    @Column({type: "int"})
    number!: number;
}