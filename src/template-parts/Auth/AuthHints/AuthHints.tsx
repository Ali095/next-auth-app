
import React, { CSSProperties, ReactNode } from 'react';
import styles from '../auth.module.scss';

type AuthHintsProps = {
    children: ReactNode
    style?: CSSProperties
}

const AuthHints = ({ children, style }: AuthHintsProps) => {
    return (
        <div style={style} className={styles.hint}>{children}</div>
    )
}

export default AuthHints;
