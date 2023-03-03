
import React, { ReactNode } from 'react';
import styles from './section.module.scss';

export const Section = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.wrap} {...props}>{children}</div>
    )
}

