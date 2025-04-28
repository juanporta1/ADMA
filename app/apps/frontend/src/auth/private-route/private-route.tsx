import { withAuthenticationRequired } from 'react-oidc-context';
import { MainColorContext } from '../../contexts/color-context';
import { useContext } from 'react';
import { Flex, Text } from '@mantine/core';

interface props {
  component: React.ComponentType<any>;
}

export function PrivateRoute({ component }: props) {
  const mainColor = useContext(MainColorContext);
  const ProtectedComponent = withAuthenticationRequired(component, {
    OnRedirecting: () => {
      return (
        <Flex
          w={'100vw'}
          h={'100vh'}
          justify={'center'}
          align={'center'}
          bg={mainColor}
        >
          <Text size="xl" c={'#fff'}>
            Redirigiendo...
          </Text>
        </Flex>
      );
    },
  });
  return <ProtectedComponent />;
}

export default PrivateRoute;
