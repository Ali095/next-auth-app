
import React from 'react';
import styles from './notification.module.scss';
import Icon from '../Icons/Icons';

type NotificationProp = {
    handleClose?: () => void
}

const Notification = ({ handleClose }: NotificationProp) => {
    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <span className={styles.icon}>
                    <Icon name='info' />
                </span>
                <span className={styles.title}>Update Terms</span>
                <button
                    className={styles.cross}
                    onClick={() => {
                        handleClose && handleClose();
                    }}
                >
                    <Icon name='cross' />
                </button>
            </header>

            <p>We updated the Zapier Terms of Service on November 15, 2022. For existing users, these updated terms will be effective beginning on December 15, 2022. By continuing to use Zapier, you agree to these updated terms.</p>
        </div>
    );
};

export default Notification;
