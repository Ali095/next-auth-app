
import React, { ReactNode } from 'react';
import styles from './layout.module.scss';

const Content = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.content} {...props}>{children}</div>
    )
}

export default Content;
