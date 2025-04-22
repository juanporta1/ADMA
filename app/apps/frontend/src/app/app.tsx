import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilterAppointments from '../components/pages/appointment/filter/filter-appointments';
import CreateAppointment from '../components/pages/appointment/create/create-appointment';
import Layout from '../components/layout/layout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/turnos/listar"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <FilterAppointments />
            </Suspense>
          }
        />
        <Route
          path="/turnos/nuevo"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <CreateAppointment />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
