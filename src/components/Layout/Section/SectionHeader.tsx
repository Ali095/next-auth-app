
import React, { ReactNode } from 'react';
import styles from './section.module.scss';

export const SectionHeader = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.header} {...props}>{children}</div>
    )
}

