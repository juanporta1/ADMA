import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import FilterAppoinments from '../assets/components/appoinment/filter/filter-appoinments';
import CreateAppoinment from '../assets/components/appoinment/create/create-appoinment';
import Layout from '../assets/components/layout/layout';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index path='/turnos/filtrar' element={<Suspense fallback={<LoadingOverlay visible />}><FilterAppoinments /></Suspense>}/>
        <Route index path='/turnos/cargar' element={<Suspense fallback={<LoadingOverlay visible />}><CreateAppoinment /></Suspense>}/>
      </Route>
    </Routes>
  );
}

export default App;
