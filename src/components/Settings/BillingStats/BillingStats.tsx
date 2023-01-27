
import React from 'react';
import styles from './billing.module.scss';

const BillingStats = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.stat}>
                    <span className={styles.icon}></span>
                    <div className={styles.details}>
                        <span className={styles.title} style={{ fontSize: '18px' }}>Personal Account</span>
                        <small className={styles.desc}>Free Plan</small>
                    </div>
                </div>

                <div className={styles.stat}>
                    <span className={styles.circle}></span>
                    <div className={styles.details}>
                        <span className={styles.title}>Tasks</span>
                        <small className={styles.desc}>0 / 100</small>
                    </div>
                </div>

                <div className={styles.stat}>
                    <span className={styles.circle}></span>
                    <div className={styles.details}>
                        <span className={styles.title}>Zaps</span>
                        <small className={styles.desc}>0 / 5</small>
                    </div>
                </div>

                <div className={styles.stat}>
                    <div className={styles.details}>
                        <span className={styles.title}>Usage reset</span>
                        <small className={styles.desc}>Dec 10, 2022</small>
                    </div>
                </div>

                <button
                    className="btn__transparent"
                    style={{ marginLeft: 'auto' }}
                >
                    Change plan
                </button>
            </div>

            <div className={styles.footer}>
                <span>Have questions about your plan? <a href="#">Learn about plans and pricing.</a></span>
            </div>
        </div>
    );
};

export default BillingStats;
