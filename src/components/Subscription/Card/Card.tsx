
import React from 'react';
import styles from './card.module.scss';

type SubscriptionType = {
    label: string
    plan: string
    price: number
    duration: string
    features: string[]
}

const Card = ({ data }: { data: SubscriptionType }) => {
    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <span className={styles.label}>{data.label}</span>
                <span className={styles.plan}>{data.plan}</span>
            </header>

            <div className={styles.body}>
                <span className={styles.price}>${data.price.toFixed(2)}</span>
                <span className={styles.duration}>{data.duration}</span>

                <div className={styles.features}>
                    {
                        data.features.map((feature, idx) => (
                            <li key={idx} className={styles.feature}>{feature}</li>
                        ))
                    }
                </div>

                <button className={styles.cta}>Edit</button>
            </div>
        </div>
    );
};

export default Card;
