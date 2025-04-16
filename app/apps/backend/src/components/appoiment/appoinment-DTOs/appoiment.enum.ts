export enum Size {
  big = 'Grande',
  medium = 'Mediano',
  little = 'Pequeño',
}

export enum Specie {
  dog = 'Canino',
  cat = 'Felino',
}

export enum Sex {
  male = 'Macho',
  female = 'Hembra',
}
export enum Status {
  pending = 'Pendiente',
  canceled = 'Cancelado',
  absent = 'Ausentado',
  pendingUpdate = 'Esperando Actualización',
  inProcess = 'En Proceso',
  done = 'Realizado',
  notDone = 'No Realizado',
}

export enum Reasons {
  ownerSickness = 'Enfermedad del dueño',
  transportIssues = 'Problemas de transporte',
  familyEmergency = 'Emergencia familiar',
  // Female specific
  inHeat = 'En celo',
  pregnant = 'Preñada',
  postPartum = 'Post parto',
  // Male specific
  aggression = 'Agresividad',
  territorialMarking = 'Marcaje territorial'
}

export enum Hours {
  eight = '8:00',
  ten = '10:00',
  twelve = '12:00',
}
