
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './styles/actions.module.scss';
import { ActionsMenu } from './ActionMenu';

export const UserTableActions = () => {
    const [open, setOpen] = useState(false);
    const [top, setTop] = useState('auto');
    const [left, setLeft] = useState('auto');

    const actions = [
        'View Details',
        'Transaction',
        'Activities',
    ]

    const actions2 = [
        'Edit',
        'Reset Pass',
        'Reset 2fa',
        'Suspend',
    ]

    const container = useRef<HTMLDivElement>(null);

    function reset() {
        setTop('-9999px');
        setLeft('-9999px');
    }

    function handleMenu(e: MouseEvent<HTMLButtonElement>) {
        reset();
        const target = e.target as HTMLButtonElement;
        const rect = target.getBoundingClientRect();
        const containerHeight = 300;
        const top = rect.bottom - 6;
        const left = rect.right;
        const windowHeight = window.innerHeight;
        const diffY = windowHeight - (top + containerHeight);

        diffY < 0 ? setTop(`${rect.top - containerHeight - 20}px`) : setTop(`${top}px`);
        setLeft(`${left}px`);
        setOpen(prev => !prev);
    }

    function handleClickedOutside(e: Event) {
        container.current && !container.current.contains(e.target as HTMLUListElement) && setOpen(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickedOutside, true);

        return () => {
            document.removeEventListener('click', handleClickedOutside, true);
        }
    }, []);

    return (
        <div className={styles.wrap}>
            <button
                className={styles.button}
                onClick={(e) => handleMenu(e)}
            >
                Actions
            </button>

            <ActionsMenu
                position={{ top, left }}
                isOpen={open}
                handleClose={() => setOpen(false)}
            >

                <div ref={container}>
                    <ul className={styles.list}>
                        {actions.map((action, idx) => <li key={idx} >{action}</li>)}
                        <li className={styles.separator} ></li>
                        {actions2.map((action, idx) => <li key={idx} >{action}</li>)}
                        <li className={styles.separator} ></li>
                        <li>Delete</li>
                    </ul>
                </div>
            </ActionsMenu>
        </div>
    )
}
