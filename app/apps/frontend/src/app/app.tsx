// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { Abm } from '../components/abm/abm'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
export function App() {
  return (
      <Routes>
        <Route path='/abm' element={<Abm />}/>
      </Routes>
  );
}

export default App;
