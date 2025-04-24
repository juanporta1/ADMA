import { Neighborhood } from "../../../data-entities/entities/neighborhood.entity";
import { Specie } from "../../../data-entities/entities/specie.entity";

export class CreateAppointmentDTO{
    name!: string;
    lastName!: string;
    home!: string;
    phone!:string;
    neighborhood!: Neighborhood;
    dni!: string;
    date!: Date;
    size!: "Pequeño" | "Mediano" | "Grande";
    sex!: "Macho" | "Hembra";
    specie!: Specie;
}