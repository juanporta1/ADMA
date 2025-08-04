export class FilterAppointmentDto {
  id?: number;
  owner?: string;
  name?: string;
  lastName?: string;
  home?: string;
  phone?: string;
  neighborhood?: number;
  dni?: string;
  date?: Date;
  size?: 'Pequeño' | 'Mediano' | 'Grande';
  sex?: 'Macho' | 'Hembra';
  specie?: number;
  startDate?: Date;
  endDate?: Date;
  orderBy?:
    | 'owner-asc'
    | 'owner-desc'
    | 'date-asc'
    | 'date-desc'
    | 'id-asc'
    | 'id-desc';
  status?:
    | 'Pendiente'
    | 'Cancelado'
    | 'Realizado'
    | 'Ausentado'
    | 'En Proceso'
    | 'No Realizado';
  byDate?: Date;
  byHour?: '8:00' | '10:00' | '12:00';
  values?: string[];
  dateFilterWay?: 'all' | 'onlyOne' | 'interval';
  page?: number;
  limit?: number;
  animalName?: string;
  mobile?: boolean; // Filtrar por si el turno es móvil
}
