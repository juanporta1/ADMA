import { Button, Flex, Title } from '@mantine/core';
import styles from './sesion.module.css';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

export function Sesion() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Flex justify={"center"} align={"start"} direction={"column"} gap={"md"}>
      <Title>Sesión</Title>
      <Button color='red' variant='light' onClick={() => {
        auth.signoutSilent();
        navigate("/login")
        localStorage.removeItem("currentUser")
      }}>Cerrar Sesion</Button>
    </Flex>
  );
}

export default Sesion;
