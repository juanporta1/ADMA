export class FilterAppoinmentDto{
    id?:number;
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
    orderBy?: "owner-asc" | "owner-desc" | "date-asc" | "date-desc" | "id-asc" | "id-desc";
    status?: "Pendiente" | "Cancelado" | "Realizado";
    byHour?: Date;
}
