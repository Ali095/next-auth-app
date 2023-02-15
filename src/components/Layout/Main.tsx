
import React, { ReactNode } from 'react';
import styles from './styles/layout.module.scss';

type ContentMainProps = {
    children: ReactNode
}

export const Main = ({ children, ...props }: ContentMainProps) => {
    return (
        <main className={styles.main} {...props}>
            {children}
        </main>
    )
}
