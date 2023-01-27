
import React from 'react';
import Icon from '../../../Icons/Icons';
import styles from './sign-with.module.scss';

const SignInWith = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.provider}>
        <Icon name="google" />
        <p>Connected as demo@gmail.com</p>
        <button
          className="btn__primary"
          style={{ maxWidth: 'max-content', padding: '0 24px', marginLeft: 'auto' }}
        >Disconnect</button>
      </div>
    </div>
  );
};

export default SignInWith;
