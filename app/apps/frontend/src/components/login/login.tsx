import { useAuth } from 'react-oidc-context';
import styles from './login.module.css';
import { useContext, useEffect } from 'react';
import { MainColorContext } from '../../contexts/color-context';
import { Button, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/general/login/use-login';
import { UserContext } from '../../contexts/user-context';
import { notifications } from '@mantine/notifications';

export function Login() {
  const auth = useAuth();
  const mainColor = useContext(MainColorContext);
  const { getUserByEmail } = useLogin();
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();



  const signInSilent = async () => {
    if (auth.isAuthenticated) {
      if (auth.user?.profile.email) {
        console.log(auth.user?.profile.email)
        const user = await getUserByEmail(auth.user.profile.email);
        console.log(user)
        await localStorage.setItem("currentUser", JSON.stringify(user));
        const userString = localStorage.getItem("currentUser");
        if (userString)setCurrentUser(JSON.parse(userString));
        if (user?.inUse) {
          navigate('/');
        } else {
          notifications.show({
            title: 'Acceso denegado',
            message: 'Ha intentado ingresar con una cuenta sin permisos',
            color: 'red',
          })
          auth.signoutSilent();
        }

      }
    }
  };

  useEffect(() => {
    signInSilent();
  }, [auth.user]); // eslint-disable-line react-hooks/exhaustive-dep

  return (
    <Flex
      w={'100%'}
      h={'100vh'}
      justify={'center'}
      align={'center'}
      bg={'#7e6c8888'}
    >
      <Button
        color={mainColor}
        size="xl"
        onClick={() => {
          console.log(auth.settings);
          auth.signinRedirect();
        }}
      >
        Ingresar
      </Button>
    </Flex>
  );
}

export default Login;
