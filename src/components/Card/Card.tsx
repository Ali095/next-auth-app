
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CardType } from '../../@types/typings';
import styles from './card.module.scss';

const Card = ({ data }: { data: CardType }) => {
    return (
        <Link href={`/user/recipes/${data.id}`} className={styles.wrap}>
            <div className={styles.icon}>
                <Image src={data.img} width={30} height={30} alt={data.title} />
            </div>

            <h3 className={styles.title}>Save new Gmail attachments to Google Drive</h3>

            <div className={styles.footer}>
                <span className={styles.footerText}>Gmail + Google Drive</span>
                <span className={styles.textHidden}>Try It</span>
                <span className={styles.arrow}></span>
            </div>
        </Link>
    );
};

export default Card;
