
import React, { CSSProperties, ReactNode } from 'react';
import styles from './input.module.scss';

type InputGroupProps = {
    id?: string
    label: string
    style?: CSSProperties
    children: ReactNode
    required?: boolean
}

export const InputGroup = ({ id, label, style, required, children }: InputGroupProps) => {
    return (
        <div className={styles.group} style={style}>
            <label htmlFor={id}>
                {label}
                {required && <small>  (Required)</small>}
            </label>
            {children}
        </div>
    );
};

