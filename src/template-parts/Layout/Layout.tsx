
import React, { ReactNode } from 'react';
import styles from './layout.module.scss';

const Layout = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.wrap} {...props}>
            {children}
        </div>
    )
}

export default Layout;
