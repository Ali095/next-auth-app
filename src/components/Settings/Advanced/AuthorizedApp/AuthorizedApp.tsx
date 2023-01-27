
import React from 'react';
import styles from './authorized.module.scss';

const AuthorizedApp = () => {
  return (
    <div className={styles.wrap}>
      <p>You have not granted any applications access to your account.</p>
    </div>
  );
};

export default AuthorizedApp;
