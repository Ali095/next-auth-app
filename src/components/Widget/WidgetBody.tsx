
import React, { CSSProperties, ReactNode } from 'react';
import styles from './widget.module.scss';

type WidgetBodyProps = {
    children: ReactNode
    style?: CSSProperties
}

export const WidgetBody = ({ children, style }: WidgetBodyProps) => {
    return (
        <div style={style} className={styles.body}>{children}</div>
    );
};
