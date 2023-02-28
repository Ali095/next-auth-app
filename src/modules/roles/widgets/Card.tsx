import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { RoleForm } from './RoleForm';
import { View } from './View';
import styles from './styles/card.module.scss';
import { convertToTitleCase } from '../../../common/helpers';
import roleService from '../roles.service';

type CardProps = {
    id: number
    roleName: string
    usersCount?: number
    permissions: string[]
}

export const Card = ({ id, roleName, usersCount = 0, permissions }: CardProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);

    const handleRoleUpdate = async ({ roleName, permissions: updatedPermissions }: { roleName: string, permissions: number[] }) => {
        await roleService.updateRole(id, { name: roleName, permissions: updatedPermissions });
        setOpenEdit(false);
    }

    return (
        <div className={styles.wrap}>
            <h3 className={styles.label}>{roleName}</h3>
            <p className={styles.tag}>Total users with this role: {usersCount}</p>
            <ul className={styles.permissions}>
                {
                    permissions.map((p, idx) => (
                        <li key={idx} >{convertToTitleCase(p, '.')}</li>
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
                <RoleForm
                    loading={true}
                    selectedPermissions={[1, 2, 3]}
                    onValidSubmit={handleRoleUpdate}
                    roleName={roleName}
                    handleClose={() => setOpenEdit(false)}
                />
            </Modal>

            <Modal
                isOpen={openView}
                handleClose={() => setOpenView(false)}
                id="role-view"
                title={roleName}
            >
                <View />
            </Modal>
        </div>
    );
};
