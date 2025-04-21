
export class CreateAppointmentDTO{
    name!: string;
    lastName!: string;
    home!: string;
    phone!:string;
    neighborhood!: string;
    dni!: string;
    date!: Date;
    size!: "Pequeño" | "Mediano" | "Grande";
    sex!: "Macho" | "Hembra";
    specie!: "Perro" | "Gato";
}