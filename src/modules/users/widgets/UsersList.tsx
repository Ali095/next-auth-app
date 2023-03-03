
import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles/users.module.scss';
import { Icon } from '../../../components/Icons';
import { Modal } from '../../../components/Modal';
import { AddUser } from './AddUser';
import { Search } from '../../../components/Table';
import { UserType } from '../@types';
import { UsersDataTable } from './UsersDataTable';
import userService from '../user.service';
import { Pagination } from '../../../components/Pagination';
import { defaultPaginationOptions, getDefaultPaginationRequestOptions } from '../../../common/constants';
import { IUserCreation } from '../../authentication/@types';


export const UsersList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [users, setUsers] = useState<UserType[]>([]);
    const [paginationOptions, setPaginateOptions] = useState(defaultPaginationOptions);
    const [paginationRequest, setPaginationRequest] = useState(getDefaultPaginationRequestOptions());

    const fetchData = useCallback(async () => {
        setWaiting(true);
        const { paginateOptions, payload } = await userService.getUsersList(paginationRequest);
        setUsers(payload);
        setPaginateOptions(paginateOptions);
        setWaiting(false);
    }, [paginationRequest]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePaginationUpdate = (page: number, limit: number) => setPaginationRequest({ ...paginationRequest, page, limit });

    const filterUsers = (value: string) => {
        if (paginationRequest.search !== value)
            setPaginationRequest({ ...paginationRequest, search: value, page: 1 });
    }

    const handleUserCreation = async (data: IUserCreation) => {
        setWaiting(true);
        await userService.addNewUser(data);
        setWaiting(false);
        setOpenModal(false);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <Search placeholder='Type & press enter to search' onInputChange={filterUsers} />

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

            <UsersDataTable users={users} loading={waiting} />

            <div className={styles.footer}>
                <Pagination {...paginationOptions}
                    onUpdate={handlePaginationUpdate}
                    recordsPerPage={paginationRequest.limit}
                />
            </div>

            <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(false)}
                id="user-add"
                title='Add Users'
            >
                <AddUser
                    loading={waiting}
                    onValidSubmit={handleUserCreation}
                    error={false}
                    onDiscard={() => setOpenModal(false)}
                />
            </Modal>
        </div>
    )
}
