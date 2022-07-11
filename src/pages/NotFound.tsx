import React from 'react';

import { NotFoundBlock } from '../components';
import styles from '../components/NotFoundBlock/NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>О-оу</h1>
      <NotFoundBlock />
    </div>
  );
};

export default NotFound;