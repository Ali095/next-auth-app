
import React, { CSSProperties, ReactNode } from 'react';
import styles from '../widget.module.scss';

type WidgetTitleProps = {
    children: ReactNode
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
    style?: CSSProperties
}

const WidgetTitle = ({ variant, children, style }: WidgetTitleProps) => {
    return (
        <div style={style} className={` ${styles.title} ${variant ? styles[variant] : 'h2'}`}>{children}</div>
    );
};

export default WidgetTitle;
