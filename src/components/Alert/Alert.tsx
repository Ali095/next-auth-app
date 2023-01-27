
import React, { useEffect, useState } from 'react';
import styles from './alert.module.scss';
import Portal from '../Portal/Portal';
import Icon from '../Icons/Icons';

type AlertProps = {
    autoClose?: boolean
    delay?: number
    handleClose?: () => void
    id?: string
    isOpen?: boolean
    message: string
    variant?: 'success' | 'danger' | 'warning' | 'info'
}

const Alert = ({ autoClose = true, delay = 5000, handleClose, isOpen = true, message, variant = 'info' }: AlertProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);

    useEffect(() => {
        autoClose && setTimeout(() => setOpen(false), delay);
    }, [autoClose, handleClose, delay]);

    useEffect(() => {
        if (!open) setTimeout(() => {
            handleClose && handleClose();
        }, 500);

    }, [open, handleClose]);

    return (
        <Portal wrapperId='alert'>
            <div className={`${styles.wrap} ${!open ? styles.close : ''} ${styles[variant]}`}>
                <span className={styles.icon}>
                    <Icon name={variant} />
                </span>

                <span className={styles.text}>{message}</span>

                <button
                    onClick={() => setOpen(false)}
                    className={styles['close-btn']}
                >
                    <Icon name='cross' />
                </button>
            </div>
        </Portal>
    );
};


export default Alert;
