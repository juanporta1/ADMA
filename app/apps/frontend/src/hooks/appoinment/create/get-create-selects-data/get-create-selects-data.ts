// Hook para obtener los datos de los selectores del formulario de creación de turnos
import { useContext } from 'react';
import { NeighborhoodsContext } from '../../../../contexts/neighborhoods-context';

export interface SelectData {
  value: string;
  text: string;
  disabled?: boolean;
}

export interface UseGetCreateSelectsData {
  sex: SelectData[];
  specie: SelectData[];
  size: SelectData[];
  neighborhood: SelectData[];
}

// Devuelve los datos para los selectores de sexo, especie, tamaño y barrio
export function useGetCreateSelectsData(): UseGetCreateSelectsData {
  const neighborhoods = useContext(NeighborhoodsContext) as string[];

  const neighborhoodsData: SelectData[] = neighborhoods.map((neig) => ({
    value: neig,
    text: neig,
  }));

  return {
    sex: [
      { value: '', text: 'Seleccione Sexo', disabled: true },
      { value: 'Macho', text: 'Macho' },
      { value: 'Hembra', text: 'Hembra' },
    ],
    specie: [
      { value: '', text: 'Seleccione Especie', disabled: true },
      { value: 'Canino', text: 'Canino' },
      { value: 'Felino', text: 'Felino' },
    ],
    size: [
      { value: '', text: 'Seleccione Tamaño', disabled: true },
      { value: 'Grande', text: 'Grande' },
      { value: 'Mediano', text: 'Mediano' },
      { value: 'Pequeño', text: 'Pequeño' },
    ],
    neighborhood: [
      { value: '', text: 'Seleccione un barrio', disabled: true },
      ...neighborhoodsData,
    ],
  };
}

export default useGetCreateSelectsData;