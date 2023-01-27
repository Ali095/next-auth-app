
import React, { CSSProperties, ReactNode } from 'react';
import styles from '../widget.module.scss';

type WidgetHeaderProps = {
    children: ReactNode
    style?: CSSProperties
}

const WidgetHeader = ({ children, style }: WidgetHeaderProps) => {
    return (
        <header style={style} className={styles.header}>{children}</header>
    );
};

export default WidgetHeader;
