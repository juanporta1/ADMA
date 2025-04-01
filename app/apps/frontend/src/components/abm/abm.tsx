import { ReactNode, useEffect, useState } from 'react';
import styles from './abm.module.css';
import { Button } from '@mantine/core';
import { error } from 'console';
 
class Appoinment{
  ID_appoinment!: number;
  owner!: string;
  home!: string;
  neighborhood!: string;
  phone!: string;
  dni!: number;
  date!: string;
  hour!: string;
  size!: "Grande" | "Pequeño" | "Mediano";

}

export function Abm() {

  const [data, setData] = useState<Appoinment[]>([]);
  const [registersAll, setRegisters] = useState<JSX.Element[]>([]);
  const [actualRegister, setActualRegister] = useState<Appoinment | null>(null);
  

  const getAll = async () => {
    try{
      const response = await fetch("http://localhost:3000/api/appoinment/get-all")
      if (!response.ok) throw new Error("Ha ocurrido un error con la API");
      const result = await response.json()
      console.log(result);
      setData(result);
    }catch(error){
      throw error
    }
  }

  useEffect(() => {
    getAll();
  },[])

  useEffect(() => {
    console.log(actualRegister)
  }, [actualRegister])

  useEffect(() => {
    setRegisters(data.map((register: Appoinment) => (
      
      <div onBlur={(e) => {
        e.currentTarget.classList.add(styles.register);
        e.currentTarget.classList.remove(styles.registerOnFocus);
      }} onClick={async (e) => {
        e.currentTarget.classList.remove(styles.register);
        e.currentTarget.classList.add(styles.registerOnFocus);
        setActualRegister(register);
      }} className={styles.register} tabIndex={0}>  
        <span>{register.ID_appoinment}</span>
        <span>{register.owner}</span>
        <span>{register.home}</span>
        <span>{register.neighborhood}</span>
        <span>{register.phone}</span>
        <span>{register.dni}</span>
        <span>{register.date}</span>
        <span>{register.hour}</span>
        <span>{register.size}</span>
      </div>
    )))
  },[data])



  return (
    <div className={styles.mainBox}>
      <div className={styles.interactionBox}>
        <div className={styles.buttonBox}>
          <Button w="150px" variant="filled" color="#d326c4" size='md'>Alta</Button>
          <Button w="150px" variant="filled" color="#d326c4" size='md'>Baja</Button>
          <Button w="150px" variant="filled" color="#d326c4" size='md'>Modificacion</Button>
        </div>
        <div className={styles.registersBox}>
          <div className={styles.firstColumns} >
            <span>ID</span>
            <span>Dueño</span>
            <span>Domicilio</span>
            <span>Barrio</span>
            <span>Telefono</span>
            <span>DNI</span>
            <span>Fecha</span>
            <span>Hora</span>
            <span>Tamaño</span>
          </div>
          <div className={styles.registers}>
            {data.length > 0 ? registersAll : <></>}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Abm;
