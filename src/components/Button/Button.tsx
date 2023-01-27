import React, { CSSProperties, MouseEvent, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    text: string
    children?: ReactNode
    style?: CSSProperties
    variant: 'primary' | 'secondary' | 'transparent'
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, style, text, variant, onClick }: ButtonProps) => {
    return (
        <button
            className={`${styles.btn} ${styles[variant]}`}
            onClick={onClick}
            style={style}
        >
            {children}
            <span className={styles.text}>{text}</span>
        </button>
    );
};

export default Button;
