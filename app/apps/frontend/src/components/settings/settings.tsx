import { Box, Flex, NavLink, TableOfContents } from '@mantine/core';
import styles from './settings.module.css';
import AddUsers from './sections/add-users/add-users';
import { useContext } from 'react';
import { MainColorContext } from '../../contexts/color-context';
import Sesion from './sections/sesion/sesion';

export function Settings() {
  const mainColor = useContext(MainColorContext);
  return (
    <Flex
      justify={'center'}
      align={'start'}
      w={'100%'}
      h={'100%'}
      direction={'row'}
      gap={'xl'}
    >
      <Box style={{
        marginTop: "50px",
        paddingLeft: "20px",
        borderLeft: `1px solid ${mainColor}aa`,
      }}>
        <TableOfContents
          getControlProps={({ data }) => ({
            onClick: () => data.getNode().scrollIntoView(),
            children: data.value,
          })}
          size="sm"
          minDepthToOffset={0}
          depthOffset={40}
          classNames={styles}
        />
      </Box>

      <Flex
        w={'50%'}
        style={{ overflowY: 'auto', maxHeight: '80%' }}
        direction={'column'}
        gap={"xl"}
      >
        <AddUsers id="add-users" />
        <Sesion />
      </Flex>
    </Flex>
  );
}

export default Settings;
