
import React, { useState } from 'react';
import { SelectOption } from '../../../@types/typings';
import styles from './styles/add.user.module.scss';

export const AddUser = ({ closePopup }: { closePopup: (...args: any[]) => any; }) => {

    const handleCancel = () => {
        closePopup();
    }

    return (
        <div className={styles.wrap}>
            {/* <header className={styles.header}>
                <h3 className={styles.title}>Add Users</h3>
            </header> */}

            <div className={styles.body}>
                <h1>Adding new user</h1>
            </div>

            <div className={styles.footer}>
                <button
                    type='button'
                    className="btn__primary"
                    style={{ maxWidth: 'max-content' }}
                >Submit</button>

                <button
                    type='button'
                    className="btn__transparent"
                    onClick={handleCancel}
                >Cancel</button>
            </div>
        </div>
    )
}

