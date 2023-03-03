
import React, { CSSProperties, ReactNode } from 'react';
import styles from './widget.module.scss';

type WidgetHeaderProps = {
    children: ReactNode
    style?: CSSProperties
}

export const WidgetHeader = ({ children, style }: WidgetHeaderProps) => {
    return (
        <header style={style} className={styles.header}>{children}</header>
    );
};
