
import React, { ReactNode } from 'react';
import styles from './layout.module.scss';

type ContentMainProps = {
    children: ReactNode
}

const Main = ({ children, ...props }: ContentMainProps) => {
    return (
        <main className={styles.main} {...props}>
            {children}
        </main>
    )
}

export default Main;
