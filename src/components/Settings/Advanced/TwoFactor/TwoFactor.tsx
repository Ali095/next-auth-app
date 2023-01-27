
import React from 'react';
import styles from './two-factor.module.scss';

const TwoFactor = () => {
  return (
    <div className={styles.wrap}>
      <p>Add an extra layer of security to your Zapier account by requiring access to your phone or mobile device. Once enabled, your account is protected (even if your password is lost or stolen) by requiring both your password and an authentication code from your mobile device in order to log into your Zapier account.
      </p>
      <p>Two-Factor Authentication is not enabled for this account.</p>
      <button
        className="btn__primary"
        style={{ maxWidth: 'max-content', padding: '0 24px', marginTop: '20px' }}
      >Setup Two-Factor Authentication</button>
    </div>
  );
};

export default TwoFactor;
