
import React, { CSSProperties, ReactNode } from 'react';
import styles from './checkbox.module.scss';

type CheckboxGroupProps = {
    children: ReactNode,
    style?: CSSProperties
}

export const CheckboxGroup = ({ children, style }: CheckboxGroupProps) => {
    return (
        <div style={style} className={styles.group}>{children}</div>
    )
}
