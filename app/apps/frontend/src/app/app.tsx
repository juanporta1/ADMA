import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilterAppoinments from '../components/pages/appoinment/filter/filter-appointments';
import CreateAppoinment from '../components/pages/appoinment/create/create-appointment';
import Layout from '../components/layout/layout';
import EditAppoinment from '../components/pages/appoinment/edit/edit-appointment';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/turnos/listar"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <FilterAppoinments />
            </Suspense>
          }
        />
        <Route
          path="/turnos/nuevo"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <CreateAppoinment />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
