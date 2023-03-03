
import React, { ReactNode } from 'react';
import styles from './section.module.scss';

export const SectionTitle = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <h2 className={styles.title} {...props}>{children}</h2>
    )
}

