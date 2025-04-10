export class UpdateAppoinmentDto {
  owner!: string;
  home!: string;
  phone!: string;
  neighborhood!: string;
  dni!: string;
  date!: Date;
  size!: 'Pequeño' | 'Mediano' | 'Grande';
  sex!: 'Macho' | 'Hembra';
  race!: 'Perro' | 'Gato';
  status!: 'Pendiente' | 'Cancelado' | 'Realizado';
  observations!: string;
  reasons!:
    | 'Embarazada'
    | 'En celo'
    | 'Se ausento'
    | 'Muerte del animal'
    | 'Otras razones';
}
