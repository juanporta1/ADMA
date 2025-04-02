import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum DogSize{
  BIG= "Grande",
  MEDIUM= "Mediano",
  SMALL= "Pequeño"
}

@Entity( {name: "Appoinment"} )
export class Appoinment{

    @PrimaryGeneratedColumn()
    ID_appoinment!: number;

    @Column({type: "varchar", length: 50})
    owner!: string;

    @Column({type: "varchar", length: 75})
    home!: string;

    @Column({type: "varchar", length: 50})
    neighborhood!: string;

    @Column({type: "varchar", length: 20})
    phone!: string;

    @Column({type: "int"})
    dni!: number;

    @Column({type: "timestamp"})
    date!: Date;

    @Column({type: "varchar", enum: DogSize})
    size!: string;

    @Column({type: "varchar"})
    sex!: string;

    @Column({type: "varchar"})
    race!: string;
    

}