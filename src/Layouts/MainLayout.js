import React from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../assets/icons/i-cbt-emblem-bg.svg';

import styles from './style.module.scss';

export const MainLayout = () => {
  return (
    <div>
      <header className={styles.container}>
        <LogoIcon className={styles.logo} />
        <div>
          <h1 className={styles.title}>УКРАЇНСЬКИЙ ІНСТИТУТ КОГНІТИВНО- ПОВЕДІНКОВОЇ ТЕРАПІЇ</h1>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
