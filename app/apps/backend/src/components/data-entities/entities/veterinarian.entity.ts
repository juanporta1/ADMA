import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Veterinarian"})
export class Veterinarian{
    @PrimaryGeneratedColumn()
    ID_veterinarian!: number;

    @Column({type: "varchar"})
    name!: string;

    @Column({type: "varchar"})
    last_name!: string;

    @Column({type: "varchar", nullable: true})
    phone?: string;

    @Column({type: "varchar", nullable: true})
    email?: string;

    @Column({type: "boolean"})
    inUse!: boolean;
}