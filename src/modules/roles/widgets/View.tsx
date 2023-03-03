
import React, { useEffect, useState } from 'react';
import { Icon } from '../../../components/Icons';
import styles from './styles/view.module.scss';
import { Add } from './AddUserToRole';
import { RoleUserTable } from './RoleUserTable';
import { UserType } from '../../users/@types';
import { Pagination } from '../../../components/Pagination';
import { PaginationOptionsResponse } from '../../../@types';
import { defaultPaginationOptions } from '../../../common/constants';

type ViewRoleProps = {
    userCount?: number;
    users?: UserType[];
    loading?: boolean;
    usersPagination?: PaginationOptionsResponse
    onPageChange?: (page: number) => any
    onUserRoleUpdate?: (params: { userId: number, roleId: number }) => any
}

export const View = ({ userCount = 0, loading = false, users = [], usersPagination = defaultPaginationOptions, onPageChange, onUserRoleUpdate }: ViewRoleProps) => {
    const [openAddSection, setOpenAddSection] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body');

        openAddSection ? body?.setAttribute('data-add-open', '') : body?.removeAttribute('data-add-open');

    }, [openAddSection]);


    return openAddSection ?
        <Add handleClose={() => setOpenAddSection(false)} /> :
        <div className={styles.wrap}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Users assigned <small>({userCount})</small></h3>
                    <div className={styles.search}>
                        <input type="text" placeholder='Search Users' />
                    </div>

                    <button
                        className={styles.addButton}
                        onClick={() => setOpenAddSection(prev => !prev)}
                    >
                        <Icon name='plus' />
                    </button>
                </div>
                <RoleUserTable onUserRoleUpdate={onUserRoleUpdate} users={users} loading={loading} />
                <div className={styles.footer}>
                    <Pagination
                        {...usersPagination}
                        maxPagesToShow={3}
                        limitSelection={false}
                        handlePageChange={onPageChange}
                    />
                </div>
            </div>
        </div>;
};
