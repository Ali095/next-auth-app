
import React, { ChangeEvent, useState } from 'react';
import { Icon } from '../../../components/Icons';
import { RoleUserTable } from './RoleUserTable';
import styles from './styles/view.module.scss';

export const Add = ({ handleClose }: { handleClose: () => void }) => {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value.length > 0 ? setShowResults(true) : setShowResults(false);
        setQuery(e.target.value);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.searchWrap}>
                <h3 className={styles.title}>Search Users</h3>
                <p>Add users in this role</p>

                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder='Search Users'
                        value={query}
                        onChange={handleSearch}
                    />
                </div>

                <button
                    onClick={() => handleClose()}
                    className={styles.closeAdd}
                >
                    <Icon name='back' />
                </button>
            </div>

            {
                showResults && <div className={styles.table}>
                    <RoleUserTable users={[]} />
                </div>
            }
        </div>
    );
};
