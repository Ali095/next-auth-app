
import React, { useState } from 'react';
import styles from './burgermenu.module.scss';

const BurgerMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <button
            className={`${styles.container} ${open ? styles.open : ''}`}
            onClick={() => setOpen(prev => !prev)}
        ><span></span></button>
    );
};

export default BurgerMenu;

