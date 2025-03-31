
export class CreateAppoinmentDTO{
    owner!: string;
    home!: string;
    phone!:string;
    neighborhood!: string;
    dni!: number;
    date!: string;
    hour!: string;
    size!: "Pequeño" | "Mediano" | "Grande";
}