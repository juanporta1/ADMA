import {
  Neighborhood,
  Reason,
  Specie,
  Veterinarian,
} from './data-entities.types';

export interface IncomeForm {
  ID_income: number;
  age: string;
  weight: number;
  features?: string;
  animalName: string;
  veterinarian: Veterinarian | null;
  observations?: string | null;
}

export interface Castration {
  ID_castration: number;
  age: string;
  weight: number;
  features?: string | null;
  animalName: string;
  veterinarian: Veterinarian | null;
  observations?: string | null;
}
// Interfaz para la estructura de un turno
export interface Appointment {
  ID_appointment: number; // ID único del turno
  lastName: string;
  name: string; // Nombre del dueño
  home: string; // Domicilio
  neighborhood: Neighborhood; // Barrio
  phone: string | null; // Teléfono
  dni: string; // DNI del dueño
  date: string; // Fecha del turno
  hour: string; // Hora del turno
  size: 'Grande' | 'Pequeño' | 'Mediano'; // Tamaño de la mascota
  sex: 'Macho' | 'Hembra'; // Sexo de la mascota
  specie: Specie; // Especie de la mascota
  status:
    | 'Pendiente'
    | 'Cancelado'
    | 'Ausentado'
    | 'Esperando Actualización'
    | 'En Proceso'
    | 'Realizado'
    | 'No Realizado'; // Estado del turno
  observations: string | null; // Observaciones adicionales
  reason: Reason | null; // Razón de cancelación u otra
  incomeForm: IncomeForm | null;
  castration: Castration | null;
  surgeryNumber: number | null;
}
