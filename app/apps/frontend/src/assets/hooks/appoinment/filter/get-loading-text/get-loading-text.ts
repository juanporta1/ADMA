import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseGetLoadingText {
  color: string;
  text: string;
}

export function useGetLoadingText(isLoading: string | null): UseGetLoadingText {
  if (isLoading === 'loading') {
    return {
      color: '#000',
      text: 'Filtrando...',
    };
  } else if (isLoading === 'loaded') {
    return {
      color: '#69c266',
      text: 'Filtrado',
    };
  } else if (isLoading === 'error') {
    return {
      color: '#e84b4b',
      text: 'Algo salio mal... Intentalo de nuevo.',
    };
  } else {
    return {
      text: '',
      color: '',
    };
  }
}

export default useGetLoadingText;
