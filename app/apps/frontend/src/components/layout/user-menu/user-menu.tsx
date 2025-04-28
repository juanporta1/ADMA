import { Avatar, Indicator, Menu } from '@mantine/core';
import styles from './user-menu.module.css';
import { useAuth } from 'react-oidc-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Menu trigger="hover">
      <Menu.Target>
        <Indicator
          inline
          size={16}
          offset={10}
          position="bottom-end"
          color="green"
        >
          <Avatar
            src={auth.user?.profile.picture}
            alt=""
            size={'lg'}
            style={{ cursor: 'pointer' }}
          />
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            auth.signoutSilent();
            navigate('/login');
            localStorage.removeItem('currentUser');
          }}
          leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          color="red"
        >
          Cerrar Sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
