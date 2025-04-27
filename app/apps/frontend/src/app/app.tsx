import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilterAppointments from '../components/pages/appointment/filter/filter-appointments';
import CreateAppointment from '../components/pages/appointment/create/create-appointment';
import Layout from '../components/layout/layout';
import Castration from '../components/pages/castration/castration';
import IncomeForm from '../components/pages/income-form/income-form';
import Login from '../components/login/login';

export function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
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
        <Route
          path="/castraciones"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <Castration />
            </Suspense>
          }
        />
        <Route
          path="/planilla-de-ingreso"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <IncomeForm />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
