import { isNumberLike } from '@mantine/core';

export interface Reason {
  ID_reason: number;
  reason: string;
  reasonSex: 'a' | 'h' | 'm';
  inUse: boolean;
}

export interface Veterinarian {
  ID_veterinarian: number;
  name: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  inUse: boolean;
}

export interface Specie {
  ID_specie: number;
  specie: string;
  inUse: boolean;
}

export interface Neighborhood {
  ID_neighborhood: number;
  neighborhood: string;
  inUse: boolean;
}

export interface newReason {
  reason: string;
  reasonSex: 'a' | 'h' | 'm';
}

export interface newSpecie {
  specie: string;
}

export interface newNeighborhood {
  neighborhood: string;
}
export interface newVeterinarian {
  name: string;
  lastName: string;
  phone?: string;
  email?: string;
}

export interface DataEntities {
  reasons: Reason[];
  species: Specie[];
  neighborhoods: Neighborhood[];
  veterinarians: Veterinarian[];
}

export interface editedNeighborhood {
  neighborhood?: string;
  inUse?: boolean;
}
export interface editedSpecie {
  specie?: string;
  inUse?: boolean;
}
export interface editedReason {
  reason?: string;
  reasonSex?: 'a' | 'm' | 'h';
  inUse?: boolean;
}

export interface editedVeterinarian {
  name?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  inUse?: boolean;
}

export interface Setting {
  settingName: string;
  settingIntValue?: number | null;
  settingStringValue?: string | null;
  settingBooleanValue?: boolean | null;
}
