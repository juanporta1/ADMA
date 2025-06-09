export interface AppoinmentSelects {
  findBy: SelectData[];
  sex: SelectData[];
  specie: SelectData[];
  size: SelectData[];
  filterStatus: SelectData[];
  status: SelectData[];
  neighborhood: SelectData[];
  orderBy: SelectData[];
  hour: SelectData[];
  reason: SelectData[];
  dateFilterWay: SelectData[];
  restrictedNeighborhood: SelectData[];
  restrictedSize: SelectData[];
  restrictedSpecie: SelectData[];
  restrictedSex: SelectData[];
  age: SelectData[];
  veterinarian: SelectData[];
}
export interface SelectData {
  value: string | number;
  text: string;
  disabled?: boolean;
}
