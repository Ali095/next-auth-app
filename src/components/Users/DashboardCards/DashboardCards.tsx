
import React from 'react';
import styles from './cards.module.scss';

type CardDataType = {
    label: string
    count?: number
    currency?: string
    percentage: number
    infoText: string
}

const DashboardCards = ({ data }: { data: CardDataType[] }) => {
    return (
        <div className={styles.cards}>
            {
                data.map((d, idx) => (
                    <Card key={idx} data={d} />
                ))
            }
        </div>
    );
};

const Card = ({ data }: { data: CardDataType }) => {
    return (
        <div className={styles.card}>
            <div className={styles.details}>
                <span className={styles.label}>{data.label}</span>
                <span className={styles.stats}>
                    <span className={styles.count}>
                        {data.count && data.count?.toLocaleString()}
                        {data.currency && data.currency}
                    </span>
                    <span className={`${styles.percentage} ${data.percentage < 0 ? styles.minus : ''}`}>({data.percentage}%)</span>
                </span>
                <p>{data.infoText}</p>
            </div>
        </div>
    );
};

export default DashboardCards;
