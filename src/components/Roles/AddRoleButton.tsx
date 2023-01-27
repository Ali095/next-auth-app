
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './role.module.scss';
import RoleForm from './RoleForm/RoleForm';

const AddRoleButton = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className={styles.addRole}
            >
                Add New Role
            </button>

            <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(false)}
                id="role-edit"
                title='Update Role'
            >
                <RoleForm label={''} handleClose={() => setOpenModal(false)} />
            </Modal>
        </>

    );
};

export default AddRoleButton;
