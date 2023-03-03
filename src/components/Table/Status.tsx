
import React from 'react';
import styles from './styles/status.module.scss';

export const Status = ({ status }: { status: string }) => {
    return (
        <span className={`${styles.status} ${styles[status]} `}>
            {status}
        </span>
    )
}
