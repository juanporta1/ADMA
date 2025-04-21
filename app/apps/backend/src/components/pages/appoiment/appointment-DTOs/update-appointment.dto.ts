import { Neighborhood } from "../../../data-entities/entities/neighborhood.entity";
import { Reason } from "../../../data-entities/entities/reason.entity";
import { Specie } from "../../../data-entities/entities/specie.entity";
import { Reasons } from "./appointment.enum";

export class UpdateAppointmentDto {
  name!: string;
  lastName!: string;
  home!: string;
  phone!: string;
  neighborhood!: Neighborhood;
  dni!: string;
  date!: Date;
  size!: 'Pequeño' | 'Mediano' | 'Grande';
  sex!: 'Macho' | 'Hembra';
  specie!: Specie;
  status!: 'Pendiente' | 'Cancelado' | 'Realizado';
  observations!: string;
  reasons!:Reason;
}
