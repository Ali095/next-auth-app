
import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { Logo } from '../../components/Logo';
import styles from './styles/layout.module.scss';
import { Toggle } from './';

type SidebarProps = {
    children: ReactNode
}

export const Sidebar = ({ children, ...props }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [pinned, setPinned] = useState(true);

    function handleMouseEnter(e: MouseEvent<HTMLElement>) {
        if (pinned) return
        setCollapsed(false);
    }

    function handleMouseLeave(e: MouseEvent<HTMLElement>) {
        if (pinned) return
        setCollapsed(true);
    }

    useEffect(() => {
        collapsed ?
            document.body.setAttribute('data-sidebar-collapsed', '') :
            document.body.removeAttribute('data-sidebar-collapsed');

    }, [collapsed]);

    useEffect(() => {
        pinned ?
            document.body.setAttribute('data-sidebar-pinned', '') :
            document.body.removeAttribute('data-sidebar-pinned');

    }, [pinned]);

    return (
        <aside
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
            className={`${styles.sidebar} ${styles.sticky}`}
            {...props}
        >
            <Logo />
            <Toggle pinned={pinned} handlePinned={() => setPinned(prev => !prev)} />
            {children}
        </aside>
    )
}
