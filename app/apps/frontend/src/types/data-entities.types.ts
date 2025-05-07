export interface Reason {
  ID_reason: number;
  reason: string;
  reasonSex: 'a' | 'h' | 'm';
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
