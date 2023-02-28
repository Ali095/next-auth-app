
import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import styles from './styles/role.module.scss';
import { RoleForm } from './RoleForm';
import roleService from '../roles.service';

export const AddRoleButton = ({ onSuccess }: { onSuccess: () => any }) => {
    const [openModal, setOpenModal] = useState(false);

    const addRoleonSubmit = async (params: { roleName: string; permissions: number[] }) => {
        console.log('paraaamsss=>', params);
        await roleService.createRole({ name: params.roleName, permissions: params.permissions });
        setOpenModal(false);
        onSuccess && onSuccess();
    }

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
                title='Add New Role'
            >
                <RoleForm onValidSubmit={addRoleonSubmit} handleClose={() => setOpenModal(false)} />
            </Modal>
        </>

    );
};
