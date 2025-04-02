
export class CreateAppoinmentDTO{
    owner!: string;
    home!: string;
    phone!:string;
    neighborhood!: string;
    dni!: number;
    date!: Date;
    
    size!: "Pequeño" | "Mediano" | "Grande";
    sex!: "Macho" | "Hembra";
    race!: "Perro" | "Gato";
}