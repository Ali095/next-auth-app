import React from 'react';
import styles from './tiles.module.scss';

export type DashboardTileType = {
    label: string
    count?: number
    currency?: string
    percentage: number
    infoText: string
}

export const DashboardTiles = ({ data }: { data: DashboardTileType[] }) => {
    return (
        <div className={styles.cards}>
            {
                data.map((d, idx) => (
                    <Tile key={idx} data={d} />
                ))
            }
        </div>
    )
}

export const Tile = ({ data }: { data: DashboardTileType }) => {
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
    )
}
