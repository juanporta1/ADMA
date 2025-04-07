export class FilterAppoinmentDto{
    ID_appoinment?:number;
    owner?: string;
    home?: string;
    phone?:string;
    neighborhood?: string;
    dni?: string;
    date?: Date;
    size?: "Pequeño" | "Mediano" | "Grande";
    sex?: "Macho" | "Hembra" ;
    race?: "Perro" | "Gato" ;
    startDate?: Date;
    endDate?: Date;
    orderByName?: "ASC" | "DESC";
    status?: "Pendiente" | "Cancelado" | "Realizado";
}
