
import React, { CSSProperties, ReactNode } from 'react';
import styles from '../auth.module.scss';

type AuthTitleProps = {
    children: ReactNode
    style?: CSSProperties
}

const AuthTitle = ({ children, style }: AuthTitleProps) => {
    return (
        <h2 style={style} className={styles.title}>{children}</h2>
    )
}

export default AuthTitle;
