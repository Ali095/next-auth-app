
import Image from 'next/image';
import React from 'react';
import styles from './card.module.scss';

const InvoiceCard = () => {
    return (
        <span className={styles.wrap}>
            <span className={styles.img}>
                <Image src='/images/mastercard.svg' width={42} height={30} alt="master card" />
            </span>

            <span className={styles.text}>•••• 7263</span>
        </span>
    );
};

export default InvoiceCard;
