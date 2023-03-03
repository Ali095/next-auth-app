
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { ActionsMenu } from './';
import styles from './actions.module.scss';

export const Actions = ({ list }: { list: { label: string, onClick: () => any }[] }) => {
    const [open, setOpen] = useState(false);
    const [top, setTop] = useState('auto');
    const [left, setLeft] = useState('auto');

    const container = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);

    const reset = () => {
        setTop('-9999px');
        setLeft('-9999px');
    }

    const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
        reset();
        if (open) {
            setOpen(false);
            return;
        }
        const target = e.target as HTMLButtonElement;
        const rect = target.getBoundingClientRect();
        const containerHeight = 82;
        const top = rect.bottom - 6;
        const left = rect.right;
        const windowHeight = window.innerHeight;
        const diffY = windowHeight - (top + containerHeight);

        diffY < 0 ? setTop(`${rect.top - containerHeight - 20}px`) : setTop(`${top}px`);
        setLeft(`${left}px`);
        // setOpen(prev => !prev);
        setOpen(true);
    }

    const handleClickedOutside = (e: Event) => {
        if (!container.current || !button.current) return;

        if (!container.current.contains(e.target as HTMLUListElement)) {
            if (e.target === button.current) return;
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickedOutside, true);

        return () => {
            document.removeEventListener('click', handleClickedOutside, true);
        };
    }, []);

    return (
        <div className={styles.wrap}>
            <button
                className={styles.button}
                onClick={(e) => handleMenu(e)}
                ref={button}
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
                        {list.map((action, idx) => <li
                            onClick={() => { setOpen(false); action.onClick() }}
                            key={idx}
                        >
                            {action.label}
                        </li>)}
                    </ul>
                </div>
            </ActionsMenu>
        </div>
    );
};
