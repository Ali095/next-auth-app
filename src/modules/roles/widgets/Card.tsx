import React, { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { RoleForm } from './RoleForm';
import { View } from './View';
import styles from './styles/card.module.scss';
import { convertToTitleCase } from '../../../common/helpers';
import roleService from '../roles.service';
import { UserType } from '../../users/@types';
import { defaultPaginationOptions } from '../../../common/constants';

type CardProps = {
    id: number
    roleName: string
    usersCount: number
    permissions: string[]
}

export const Card = ({ id, roleName, usersCount, permissions }: CardProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserType[]>([]);
    const [cardUsersPagination, setCardUsersPagination] = useState(defaultPaginationOptions);
    const [page, setPage] = useState(1);

    const handleRoleUpdate = async ({ roleName, permissions: updatedPermissions }: { roleName: string, permissions: number[] }) => {
        setLoading(true);
        await roleService.updateRole(id, { name: roleName, permissions: updatedPermissions });
        setLoading(false);
        setOpenEdit(false);
    }

    useEffect(() => {
        if (openView) {
            setLoading(true);
            (async () => {
                const usersWithRole = await roleService.getUserofSpecificRole(id, page);
                setUsers(usersWithRole.payload);
                setCardUsersPagination(usersWithRole.paginateOptions);
                setLoading(false);
            })();
        }

        return () => setUsers([]);
    }, [openView, id, page]);

    const handleUserRemovalFromRole = async (userId: number) => {
        await roleService.removeUserFromRole({ userId, roleId: id })
        setUsers(users.filter(u => u.id !== id));
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
                    loading={loading}
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
                <View
                    handleUserRemovalFromRole={handleUserRemovalFromRole}
                    onPageChange={p => setPage(p)}
                    usersPagination={cardUsersPagination}
                    users={users}
                    loading={loading}
                    userCount={usersCount}
                />
            </Modal>
        </div>
    );
};
