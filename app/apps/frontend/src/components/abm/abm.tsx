import { useEffect, useRef, useState } from 'react';
import styles from './abm.module.css';
import { Button, Table, Paper, Modal, Flex, List, Container} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications"

 
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
  const [actualRegister, setActualRegister] = useState<Appoinment | null>(null);
  const refs = useRef<Map<number , HTMLDivElement>>(new Map());
  const [ deleteModalValue, {open: openDelete, close: closeDelete}] = useDisclosure(false);
  const [ createModalValue, {open: openCreate, close: closeCreate}] = useDisclosure(false);


  const openDeleteAlert = () => {

  }

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

  

  const removeRegister = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/appoinment/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).catch((err) => {
      throw err
    });

    if(response.ok){
      const newData = data.filter((register) => register.ID_appoinment != id);
      setData(newData);
    }
    return response.ok
  }

  const deleteNotificationHandler =  async () => {
    if (actualRegister !== null){
      const ok = await removeRegister(actualRegister.ID_appoinment);
      if(ok){
        notifications.show({
          position: "top-left",
          title: 'El registro se ha borrado con exito.',
          message: 'Puedes cerrar esta notificacion.',
          color: "green"
        })
      }else{
        notifications.show({
          position: "top-left",
          title: 'No se ha podido eliminar este registro.',
          message: 'Reintena en un momento.',
          color: "red"

        })
      }
      close();
    }}

  const Rows = () => {
      
    
    return data.map((register: Appoinment) => (
      
      <Table.Tr ref={(div) => refs.current.set(register.ID_appoinment, div!)} onClick={(e) => {
        setActualRegister(register);
      }} className={styles.register}>  
        <Table.Td>{register.ID_appoinment}</Table.Td>
        <Table.Td>{register.owner}</Table.Td>
        <Table.Td>{register.home}</Table.Td>
        <Table.Td>{register.neighborhood}</Table.Td>
        <Table.Td>{register.phone}</Table.Td>
        <Table.Td>{register.dni}</Table.Td>
        <Table.Td>{register.date}</Table.Td>
        <Table.Td>{register.hour}</Table.Td>
        <Table.Td>{register.size}</Table.Td>
      </Table.Tr>
    ))
  }

  useEffect(() => {
    if (actualRegister){
      refs.current.get(actualRegister.ID_appoinment)!.style = "background-color: #ccc";
    }
  }, [actualRegister])

  useEffect(() => {
    getAll();
  }, [])

  useEffect(() => {
    console.log(actualRegister)
  }, [actualRegister])
  return (
    
    <div className={styles.mainBox}>
      
      <Paper shadow="lg" radius="xs">
        <div className={styles.interactionBox}>
          <div className={styles.buttonBox}>
            <Button w="150px" variant="filled" color="#86457c" size='md'>Alta</Button>
            <Button onClick={() => {
              if (actualRegister !== null){
                openDelete()
              }
            }} w="150px" variant="filled" color="#86457c" size='md'>Baja</Button>
            <Button w="150px" variant="filled" color="#86457c" size='md'>Modificacion</Button>
          </div>
          <div className={styles.registersBox}>
            
            <Table stickyHeader>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Dueño</Table.Th>
                  <Table.Th>Domicilio</Table.Th>
                  <Table.Th>Barrio</Table.Th>
                  <Table.Th>Telefono</Table.Th>
                  <Table.Th>DNI</Table.Th>
                  <Table.Th>Fecha</Table.Th>
                  <Table.Th>Hora</Table.Th>
                  <Table.Th>Tamaño</Table.Th>
                </Table.Tr>
              </Table.Thead>
              
                {data.length > 0 ? <Rows></Rows> : <></>}
            </Table>
          </div>
        </div>
      </Paper>
      <Modal centered onClose={closeDelete} opened={deleteModalValue} title="¿Seguro quieres borrar este registro?" w={100}>
      
        <Flex  miw={100} mih={50} gap="sm" justify="center" align="center" direction="row" wrap="nowrap">
          <Button w="150px" variant="filled" color="#86457c" size='md' onClick={deleteNotificationHandler}>Si</Button>
          <Button w="150px" variant="filled" color="#86457c" size='md' onClick={closeDelete}>No</Button>
        </Flex>
      </Modal>
      
      <Modal  miw={100} mih={50} gap="sm" justify="center" align="center" direction="row" wrap="nowrap">

      </Modal>

    </div>

    
  );
}

export default Abm;
