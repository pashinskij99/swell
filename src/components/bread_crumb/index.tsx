import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

type Props = {
  // theme: 'light' | 'dark'
  // disabled: boolean
  // id?: number
  path: Array<string>;
};

const BreadCrumbs: React.FC<Props> = (props: Props) => {
  const { path } = props;

  return (
    <div className={styles.bread_crumb_wrapper}>
      <div className={styles.bread_crumb_home}>
        <Link href="/">
          <a> </a>
        </Link>
      </div>
      {path.map((item, i) => (
        <div key={item} className={styles.bread_crumb_page}>
          <span className={styles.bread_crumb_dash}>-</span>
          <Link href={path[i]} className={styles.bread_crumb_title}>
            {path[i]}
          </Link>
        </div>
      ))}
    </div>
  );
};

export { BreadCrumbs };
