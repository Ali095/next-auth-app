
import React, { useState } from 'react';
import Icon from '../../Icons/Icons';
import Modal from '../../Modal/Modal';
import Pagination from '../../Pagination/Pagination';
import Search from '../../Table/Search/Search';
import Table from '../../Table/Table';
import styles from './subscriptions.module.scss';
import Checkbox from '../../Checkbox/Checkbox';
import Profile from '../../Table/Profile/Profile';
import Status from '../../Table/Status/Status';
import Actions from '../../Actions/Actions';
import { subscriptions } from '../../../data/subscriptions';


const SubscriptionTable = () => {
    const [openModal, setOpenModal] = useState(false);

    const labels = ['#', 'Customer', 'Status', 'Billing', 'Product', 'Created Date', 'Actions'];

    const actionsList = [
        'View Details',
        'Delete',
    ];

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
                        Add Subscription
                    </button>
                </div>
            </div>

            <Table labels={labels}>
                {
                    subscriptions.map((subscription, idx) => (
                        <tr key={idx}>
                            <td><Checkbox /></td>
                            <td>{idx + 1}</td>
                            <td><Profile name={subscription.name} avatar={subscription.avatar} email={subscription.email} /></td>
                            <td><Status status={subscription.status} /></td>
                            <td>{subscription.billing}</td>
                            <td>{subscription.product}</td>
                            <td>{subscription.created_data}</td>
                            <td><Actions list={actionsList} /></td>
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
                id='subscription-modal'
                title='Add Subscription'
            >
            </Modal>
        </div>
    );
};

export default SubscriptionTable;
