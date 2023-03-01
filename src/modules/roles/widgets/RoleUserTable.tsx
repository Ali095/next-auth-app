
import React, { useState } from 'react';
import { text } from 'stream/consumers';
import { Actions } from '../../../components/ActionMenu';
import { Checkbox } from '../../../components/Checkbox';
import { InputGroup } from '../../../components/Input';
import { Loader } from '../../../components/Loader';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../components/Select';
import { Table, UserProfile } from '../../../components/Table';
import { UserType } from '../../users/@types';

export type RoleUserTableProps = {
    users: UserType[],
    loading?: boolean,
    onRemove?: (id: number) => any
}

export const RoleUserTable = ({ users = [], loading, onRemove }: RoleUserTableProps): JSX.Element => {
    const labels = ['ID', 'User', 'Action'];
    const [roleupdateModal, setRoleupdateModal] = useState(false);

    //onRemove && onRemove(user.id)
    const renderUsers: JSX.Element[] = users.map((user, idx) => (
        <tr key={idx}>
            <td><Checkbox /></td>
            <td>{user.id}</td>
            <td><UserProfile profilePicture={user.avatar} name={user.name} email={user.email} /></td>
            <td><Actions list={[
                { label: 'View', onClick: () => { console.log("Redirect to user Detailed view page") } },
                { label: 'Change Role', onClick: () => setRoleupdateModal(true) }
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
            <InputGroup style={{padding:'30px'}} label='Select Role' required>
                <Select
                    value={{ label: '', value: '' }}
                    options={[{ label: 'Please Select', value: 'hello' }]}
                    onChange={(o) => { console.log(o) }}
                    style={{ maxWidth: '100%' }}
                />
            </InputGroup>
        </Modal>
    </>
    )
}

