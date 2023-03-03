
import { useState } from 'react';
import { Actions } from '../../../components/ActionMenu';
import { Checkbox } from '../../../components/Checkbox';
import { Loader } from '../../../components/Loader';
import { Modal } from '../../../components/Modal';
import { Table, UserProfile } from '../../../components/Table';
import { UserType } from '../../users/@types';
import { UpdateUserRole } from './updateUserRole';

export type RoleUserTableProps = {
    users?: UserType[],
    loading?: boolean,
    onUserRoleUpdate?: (params: { userId: number, roleId: number }) => any
}

export const RoleUserTable = ({ users = [], loading = false, onUserRoleUpdate }: RoleUserTableProps): JSX.Element => {
    const labels = ['ID', 'User', 'Action'];
    const [roleupdateModal, setRoleupdateModal] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState({ role: '', id: -1 });

    const openRoleUpdateModal = (roleName: string, userId: number) => {
        setUserToUpdate({ role: roleName, id: userId });
        setRoleupdateModal(true);
    };

    const handleUserRoleUpdate = (newRole: number) => {
        console.log('role submitted from popup', newRole);
        onUserRoleUpdate && onUserRoleUpdate({ userId: userToUpdate.id, roleId: newRole });
        setRoleupdateModal(false);
    }

    const renderUsers: JSX.Element[] = users.map((user, idx) => (
        <tr key={idx}>
            <td><Checkbox /></td>
            <td>{user.id}</td>
            <td><UserProfile profilePicture={user.avatar} name={user.name} email={user.email} /></td>
            <td><Actions list={[
                { label: 'View', onClick: () => { console.log("Redirect to user Detailed view page") } },
                { label: 'Change Role', onClick: () => openRoleUpdateModal(user.role, user.id) }
            ]} /></td>
        </tr>
    ));

    return (<>
        <Table labels={labels} >
            <tr>
                <td className='text-center' colSpan={labels.length + 1} >
                    {loading ? <Loader /> : users.length === 0 && "No users found with specified role"}
                </td>
            </tr>
            {!loading && [...renderUsers]}
        </Table>

        <Modal
            isOpen={roleupdateModal}
            handleClose={() => setRoleupdateModal(false)}
            title={'Update User Role'}
        >
            <UpdateUserRole
                loading={loading}
                currentRole={{ label: userToUpdate.role }}
                onDiscard={() => setRoleupdateModal(false)}
                onSubmit={handleUserRoleUpdate}
            />
        </Modal>
    </>
    )
}

