
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Header from './Header/Header';
import styles from './advanced.module.scss';

type AdvancedSectionProps = {
    label: string
    children: ReactNode
}

const AdvancedSection = ({ children, label }: AdvancedSectionProps) => {
    const [open, setOpen] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(0);
    const bodyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const body = bodyRef.current;
        if (!body) return;
        const h = body.scrollHeight;
        setBodyHeight(h);
    }, [open]);

    return (
        <div className={styles.section}>
            <Header
                onClick={() => setOpen(prev => !prev)}
                isOpen={open}
                label={label}
            />

            <div
                ref={bodyRef}
                className={styles.body}
                style={{
                    maxHeight: open ? `${bodyHeight}px` : 0,
                }}
            >{children}</div>
        </div>
    );
};

export default AdvancedSection;
