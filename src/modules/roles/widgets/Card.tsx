import React, { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { RoleForm } from './RoleForm';
import { View } from './View';
import styles from './styles/card.module.scss';
import { convertToTitleCase } from '../../../common/helpers';
import roleService from '../roles.service';
import { UserType } from '../../users/@types';
import { defaultPaginationOptions } from '../../../common/constants';
import { Loader } from '../../../components/Loader';

export type RoleCardProps = {
    roleData: {
        id: number;
        roleName: string;
        usersCount: number;
        permissions: string[];
    };
    loading?: boolean
    onRoleUpdate?: (params: { id: number, roleName: string, permissions: number[] }) => any
    refreshData?: (...args: any[]) => any
}

export const Card = ({ roleData, onRoleUpdate, loading = false, refreshData }: RoleCardProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [users, setUsers] = useState<UserType[]>([]);
    const [cardUsersPagination, setCardUsersPagination] = useState(defaultPaginationOptions);
    const [page, setPage] = useState(1);

    const handleRoleUpdate = async ({ roleName, permissions: updatedPermissions }: { roleName: string, permissions: number[] }) => {
        setWaiting(true);
        onRoleUpdate && onRoleUpdate({ id: roleData.id, roleName, permissions: updatedPermissions });
        setWaiting(false);
        setOpenEdit(false);
    }

    const handleUserRoleChange = async ({ userId, roleId }: { userId: number, roleId: number }) => {
        console.log('updated inc ard=>', { userId, roleId })
        await roleService.updateUserRole({ userId, roleId });
        setUsers(users.filter(u => u.id !== userId));
        refreshData && refreshData()
    }

    useEffect(() => {
        if (openView) {
            setWaiting(true);
            (async () => {
                const usersWithRole = await roleService.getUserofSpecificRole(roleData.id, page);
                setUsers(usersWithRole.payload);
                setCardUsersPagination(usersWithRole.paginateOptions);
                setWaiting(false);
            })();
        }
        return () => setUsers([]);
    }, [openView, page, roleData.id]);

    return (<>
        <div className={styles.wrap}>
            <h3 className={styles.label}>{loading ? <Loader height={10} width={10} /> : roleData.roleName}</h3>
            <p className={styles.tag}>Total users with this role: {loading ? 'Loading...' : roleData.usersCount}</p>
            {
                loading ? <Loader width={40} height={40} style={{ paddingBottom: '3rem' }} /> :
                    <ul className={styles.permissions}>
                        {
                            roleData.permissions.map((p, idx) => (
                                <li key={idx} >{convertToTitleCase(p, '.')}</li>
                            ))
                        }
                    </ul>
            }

            <div className={styles.actions}>
                <button
                    disabled={loading}
                    onClick={() => setOpenView(true)}
                    className="btn__primary"
                >View Role</button>

                <button
                    disabled={loading}
                    onClick={() => setOpenEdit(true)}
                    className="btn__transparent"
                >Edit Role</button>
            </div>
        </div>

        <Modal
            isOpen={openEdit}
            handleClose={() => setOpenEdit(false)}
            id="role-edit"
            title='Update Role'
        >
            <RoleForm
                loading={waiting}
                selectedPermissions={[1, 2, 3]}
                onValidSubmit={handleRoleUpdate}
                roleName={roleData.roleName}
                handleClose={() => setOpenEdit(false)}
            />
        </Modal>

        <Modal
            isOpen={openView}
            handleClose={() => setOpenView(false)}
            id="role-view"
            title={roleData.roleName}
        >
            <View
                onUserRoleUpdate={handleUserRoleChange}
                onPageChange={p => setPage(p)}
                usersPagination={cardUsersPagination}
                users={users}
                loading={waiting}
                userCount={roleData.usersCount}
            />
        </Modal>
    </>);
};
