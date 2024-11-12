import { FC } from 'react';
import { Loader } from 'components';
import styles from './RouteLoader.module.scss';

const RouteLoader: FC = () => (
  <div className={styles.wrapper}>
    <Loader size="100px" className={styles.loader} />
  </div>
);

export default RouteLoader;
