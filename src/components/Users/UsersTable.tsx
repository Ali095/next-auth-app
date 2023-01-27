
import React, { useState } from 'react';
import styles from './users.module.scss';
import Icon from '../Icons/Icons';
import Table from '../Table/Table';
import Modal from '../Modal/Modal';
import AddUser from './AddUser/AddUser';
import Pagination from '../Pagination/Pagination';
import Search from '../Table/Search/Search';
import UserTableActions from './Table/UserTableActions';
import Image from 'next/image';
import Checkbox from '../Checkbox/Checkbox';
import { users } from '../../data/users';
import Profile from '../Table/Profile/Profile';
import Status from '../Table/Status/Status';

const UsersTable = () => {
    const [openModal, setOpenModal] = useState(false);

    const labels = ['#', 'Name', 'Role', 'Plan', 'Billing', 'Signup Date', 'Last Login', 'Status', 'Action',];

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <Search />

                <div className={styles.actions}>
                    <button className={styles.action}>
                        <Icon name='filter' />
                        Filter
                    </button>

                    <button
                        className={styles.action}
                        onClick={() => setOpenModal(prev => !prev)}
                    >
                        <Icon name='plus' />
                        Add User
                    </button>
                </div>
            </div>

            <Table labels={labels} >
                {
                    users.map((user, idx) => (
                        <tr key={idx}>
                            <td><Checkbox /></td>
                            <td>{idx + 1}</td>
                            <td><Profile name={user.name} avatar={user.avatar} email={user.email} /></td>
                            <td>{user.role}</td>
                            <td>{user.plan}</td>
                            <td>{user.billing}</td>
                            <td>{user.signupDate}</td>
                            <td>{user.lastLogin}</td>
                            <td><Status status={user.status} /></td>
                            <td><UserTableActions /></td>
                        </tr>
                    ))
                }
            </Table>

            <div className={styles.footer}>
                <p>Showing 1 to 10 of 10 entries</p>
                <Pagination />
            </div>

            <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(false)}
                id="user-add"
                title='Add Users'
            >
                <AddUser closePopup={() => setOpenModal(false)} />
            </Modal>
        </div>
    );
};

export default UsersTable;
