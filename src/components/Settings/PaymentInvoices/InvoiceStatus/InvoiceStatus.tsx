
import React from 'react';
import styles from './status.module.scss';

const InvoiceStatus = ({ status }: { status: string }) => {
    return (
        <span className={`${styles.status} ${styles[status]}`}>
            {status}
        </span>
    );
};

export default InvoiceStatus;
