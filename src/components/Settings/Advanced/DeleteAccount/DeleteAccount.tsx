
import React from 'react';
import styles from './delete.module.scss';

const DeleteAccount = () => {
  return (
    <div className={styles.wrap}>
      <strong>This will permanently delete ...</strong>
      <ol>
        <li>Your profile</li>
        <li>All of your Zaps</li>
        <li>All of your connected accounts</li>
        <li>Any team accounts you own</li>
        <li>Any developer apps you own</li>
      </ol>

      <div className={styles.actions}>
        <button className="btn__transparent">Cancel</button>
        <button className="btn__primary">Confirm it&apos;s you</button>
      </div>
    </div>
  );
};

export default DeleteAccount;
