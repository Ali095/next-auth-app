
import React, { ReactNode } from 'react';
import styles from './styles/layout.module.scss';

export const Layout = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.wrap} {...props}>
            {children}
        </div>
    )
}
