import { CSSProperties, ReactNode } from 'react';


import styles from './checkbox.module.scss';

type CheckboxProps = {
    children?: ReactNode,
    style?: CSSProperties
}

export const Checkbox = ({ children, style, ...props }: CheckboxProps) => {
    return (
        <div style={style} className={styles.container}>
            {children ? children : <input type='checkbox' {...props} />}
        </div>
    )
}
