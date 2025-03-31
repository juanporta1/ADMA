import styles from './abm.module.css';
import { Button } from '@mantine/core';
export function Abm() {
  return (
    <div className={styles.mainBox}>
      <div className={styles.interactionBox}>
        <div className={styles.buttonBox}>
          <Button variant="filled" color="rgba(158, 32, 150, 1)">Button</Button>; 
        </div>
      </div>
    </div>
  );
}

export default Abm;
