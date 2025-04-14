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
    specie?: "Perro" | "Gato" ;
    startDate?: Date;
    endDate?: Date;
    orderBy?: "owner-asc" | "owner-desc" | "date-asc" | "date-desc" | "id-asc" | "id-desc";
    status?: "Pendiente" | "Cancelado" | "Realizado" | "Ausentado" | "En Proceso" | "No Realizado";
    byDate?: Date;
    byHour?: '8:00' | '10:00' | '12:00'
}
