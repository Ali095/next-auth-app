
import React, { CSSProperties, ReactNode } from 'react';
import styles from '../widget.module.scss';

type WidgetBodyProps = {
    children: ReactNode
    style?: CSSProperties
}

const WidgetBody = ({ children, style }: WidgetBodyProps) => {
    return (
        <div style={style} className={styles.body}>{children}</div>
    );
};

export default WidgetBody;
