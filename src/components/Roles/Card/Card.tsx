import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import RoleForm from '../RoleForm/RoleForm';
import View from '../View/View';
import styles from './card.module.scss';

type Props = {
    label: string
    usersCount: number
    permissions: string[]
}

const Card = ({ data }: { data: Props }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);

    return (
        <div className={styles.wrap}>
            <h3 className={styles.label}>{data.label}</h3>
            <p className={styles.tag}>Total users with this role: {data.usersCount}</p>
            <ul className={styles.permissions}>
                {
                    data.permissions.map((p, idx) => (
                        <li key={idx} >{p}</li>
                    ))
                }
            </ul>

            <div className={styles.actions}>
                <button
                    onClick={() => setOpenView(true)}
                    className="btn__primary"
                >View Role</button>

                <button
                    onClick={() => setOpenEdit(true)}
                    className="btn__transparent"
                >Edit Role</button>
            </div>

            <Modal
                isOpen={openEdit}
                handleClose={() => setOpenEdit(false)}
                id="role-edit"
                title='Update Role'
            >
                <RoleForm label={data.label} handleClose={() => setOpenEdit(false)} />
            </Modal>

            <Modal
                isOpen={openView}
                handleClose={() => setOpenView(false)}
                id="role-view"
                title={data.label}
            >
                <View />
            </Modal>
        </div>
    );
};

export default Card;
