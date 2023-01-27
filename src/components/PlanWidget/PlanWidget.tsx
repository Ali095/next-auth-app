
import styles from './plan-widget.module.scss';
import Icon from '../Icons/Icons';
import { useEffect, useState } from 'react';

const PlanWidget = ({ collapsed }: { collapsed: boolean }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (collapsed) {
            setShow(false);
        } else {
            setTimeout(() => {
                setShow(true);
            }, 400);
        }
    }, [collapsed]);

    return !show ?
        <div className={styles.wrap}>
            <span className={styles.icon}>
                <Icon name='plan' />
            </span>
        </div> :
        <div className={styles.wrap}>
            <header className={styles.header}>
                <span className={styles.icon}>
                    <Icon name='plan' />
                </span>
                <span className={styles.title}>Free Plan</span>
            </header>

            <div className={styles.usage}>
                <span className={styles['usage-text']} >
                    <span className={styles['usage-label']}>Requests</span>
                    <span className={styles['usage-amount']}>0/100</span>
                </span>

                <span className={styles.progress}>
                    <span className={styles.bar}></span>
                </span>
            </div>

            <div className={styles.usage}>
                <span className={styles['usage-text']} >
                    <span className={styles['usage-label']}>Recipes</span>
                    <span className={styles['usage-amount']}>0/5</span>
                </span>

                <span className={styles.progress}>
                    <span className={styles.bar}></span>
                </span>
            </div>

            <p style={{ fontSize: '14px', fontWeight: '500', margin: '10px 5px' }}>Monthly usage resets in 4 weeks</p>

            <a href="#" style={{ fontSize: '14px', fontWeight: '500', margin: '0 5px' }}>Manage Plan</a>

            <button
                className="btn__transparent"
                style={{ margin: '20px auto 0', maxWidth: '100%' }}
            >
                Upgrade Plan
            </button>
        </div>;
};

export default PlanWidget;
