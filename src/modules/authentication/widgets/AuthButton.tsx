
import React, { CSSProperties } from 'react';
import { Icon } from '../../../components/Icons';
import styles from './styles/btn.module.scss';

type AuthButtonProps = {
    name: string
    style?: CSSProperties
    variant: 'blue' | 'black'
}

const AuthButton = ({ name, style, variant, ...props }: AuthButtonProps) => {
    return (
        <button
            style={style}
            className={`${styles.btn} ${styles[variant]} ${styles[name]}`}
            {...props}
        >
            <Icon name={name} />
            <span className={styles.text}>Continue With {name}</span>
        </button>
    )
}

export default AuthButton;
