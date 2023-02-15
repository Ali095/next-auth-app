
import React, { ReactNode } from 'react';
import styles from './section.module.scss';

export const SectionDesc = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <p className={styles.desc} {...props}>{children}</p>
    )
}

