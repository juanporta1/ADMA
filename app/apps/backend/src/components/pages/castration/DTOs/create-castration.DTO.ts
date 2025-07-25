export interface CreateCastrationDTO {
  ID_appointment: number;
  ID_veterinarian: number;
  weight: number;
  animalName: string;
  features: string;
  age: string;
  observations?: string;
}
