
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './logo.module.scss';

export const Logo = () => {
    return (
        <Link href='/' className={styles.wrap}>
            <Image src='/images/logo.svg' width={80} height={40} alt='dashboard' />
        </Link>
    );
};
