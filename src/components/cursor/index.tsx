import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss'

interface ICursor {}

const Cursor: React.FC<ICursor> = () => {
  return (
    <>
      <div className={clsx(styles.cursor, 'cursor')}></div>
      <div className={clsx(styles.cursor_follower, 'cursor-follower')}></div>
    </>
  )
}

export default Cursor;
