
import React, { useEffect, useState } from 'react';
import Icon from '../../Icons/Icons';
import styles from './view.module.scss';
import Add from './Add';
import RoleUserTable from '../RoleUserTable/RoleUserTable';

const View = () => {
    const [openAddSection, setOpenAddSection] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body');

        openAddSection ? body?.setAttribute('data-add-open', '') : body?.removeAttribute('data-add-open');

    }, [openAddSection]);


    return openAddSection ?
        <Add handleClose={() => setOpenAddSection(false)} /> :
        <div className={styles.wrap}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Users assigned <small>(14)</small></h3>
                    <div className={styles.search}>
                        <input type="text" placeholder='Search Users' />
                    </div>

                    <button
                        className={styles.addButton}
                        onClick={() => setOpenAddSection(prev => !prev)}
                    >
                        <Icon name='plus' />
                    </button>
                </div>
                <RoleUserTable />
            </div>
        </div>;
};

export default View;
