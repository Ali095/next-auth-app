
import React from 'react';
import styles from './styles/auth.module.scss';

const AuthDivider = () => {
    return (
        <span className={styles.divider}>
            <span className={styles['divider-text']}>or</span>
        </span>
    )
}

export default AuthDivider;
