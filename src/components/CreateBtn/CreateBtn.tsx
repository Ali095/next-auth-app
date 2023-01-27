
import Link from 'next/link';
import React from 'react';
import Icon from '../Icons/Icons';
import styles from './cta.module.scss';

const CreateBtn = ({ href }: { href: string }) => {
    return (
        <Link href={href} className={styles.btn}>
            <Icon name='plus' />
            <span className={styles.text}> Create Recipes</span>
        </Link>
    );
};

export default CreateBtn;
