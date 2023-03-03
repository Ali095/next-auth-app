
import React, { ReactNode } from 'react';
import styles from './styles/layout.module.scss';

export const Content = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.content} {...props}>{children}</div>
    )
}

