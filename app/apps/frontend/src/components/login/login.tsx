import { useAuth } from 'react-oidc-context';
import styles from './login.module.css';
import { useContext } from 'react';
import { MainColorContext } from '../../contexts/color-context';
import { Button, Flex } from '@mantine/core';

export function Login() {
  const auth = useAuth();
  const mainColor = useContext(MainColorContext);
  console.log(auth);
  return (
    <Flex w={"100%"} h={"100vh"} justify={'center'} align={"center"} bg={"#7e6c8888"}>
      <Button
        color={mainColor}
        size="xl"
        onClick={() => {
          auth.signinRedirect();
        }}
      >
        Ingresar
      </Button>
    </Flex>
  );
}

export default Login;
