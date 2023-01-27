
import React from 'react';
import styles from './pagination.module.scss';

const Pagination = () => {
    return (
        <ul className={styles.pagination}>
            <li className={`${styles['pagination-btn']} ${styles['pagination-prev']}`}>Previous</li>
            <li className={`${styles['pagination-btn']} ${styles['pagination-active']}`}>1</li>
            <li className={`${styles['pagination-btn']}`}>2</li>
            <li className={`${styles['pagination-btn']}`}>3</li>
            <li className={`${styles['pagination-btn']} ${styles['pagination-next']}`}>Next</li>
        </ul>
    );
};

export default Pagination;
