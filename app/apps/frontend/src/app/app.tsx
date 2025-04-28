import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilterAppointments from '../components/pages/appointment/filter/filter-appointments';
import CreateAppointment from '../components/pages/appointment/create/create-appointment';
import Layout from '../components/layout/layout';
import Castration from '../components/pages/castration/castration';
import IncomeForm from '../components/pages/income-form/income-form';
import Login from '../components/login/login';
import PrivateRoute from '../auth/private-route/private-route';
import Settings from '../components/settings/settings';

export function App() {
  return (
    <Routes>
      <Route index path='/login' element={<Login/>} />
      <Route path="/" element={<PrivateRoute component={Layout}/>}>
        <Route
          path="/turnos/listar"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <PrivateRoute component={FilterAppointments} />
            </Suspense>
          }
        />
        <Route
          path="/turnos/nuevo"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <PrivateRoute component={CreateAppointment} />
              
            </Suspense>
          }
        />
        <Route
          path="/castraciones"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <PrivateRoute component={Castration} />
            </Suspense>
          }
        />
        <Route
          path="/planilla-de-ingreso"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <PrivateRoute component={IncomeForm} />
            </Suspense>
          }
        />
        <Route path="/configuracion" 
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <PrivateRoute component={Settings} />
            </Suspense>
          }/>
      </Route>
    </Routes>
  );
}

export default App;
