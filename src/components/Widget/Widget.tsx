
import React, { CSSProperties, ReactNode } from 'react';
import styles from './widget.module.scss';

type WidgetProps = {
    children: ReactNode
    style?: CSSProperties
}

const Widget = ({ children, style }: WidgetProps) => {
    return (
        <div style={style} className={styles.wrap}>{children}</div>
    );
};

export default Widget;
