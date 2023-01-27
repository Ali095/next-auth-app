
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { User } from '../../../../@types/typings';
import Icon from '../../../Icons/Icons';
import AddButton from './AddButton/AddButton';
import styles from './search.module.scss';
import { users } from '../../../../data/users';


const RoleSearch = () => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [focus, setFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchResults([]);
        setSearchTerm(e.target.value);
    }

    function selectUser(user: User) {
        setSelectedUsers(prev => [...prev, user]);
        setSearchResults(prev => prev.filter(u => u != user));
        setSearchTerm('');
    }

    function removeSelected(user: User) {
        const filtered = selectedUsers.filter(u => u !== user);
        setSelectedUsers(filtered);
        setSearchResults(prev => [...prev, user]);
    }

    useEffect(() => {
        const timeoutId: NodeJS.Timeout = setTimeout(() => {
            const filteredResult = users.filter(user => {
                return user.name.toLowerCase().includes(searchTerm.toLowerCase());
            });

            setSearchResults(filteredResult);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        const input = inputRef.current;
        if (input) focus && input.focus();
    }, [focus]);

    return (
        <div className={styles.wrap}>
            <label htmlFor="">Add team members</label>
            <div
                tabIndex={0}
                className={styles.search}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            >
                <div className={styles.selection}>
                    {selectedUsers.map((user, idx) => (
                        <div key={idx} className={styles.selected}>
                            {user.name}
                            <button
                                className={styles['selected-remove']}
                                onClick={() => removeSelected(user)}
                            >
                                <Icon name='cross' />
                            </button>
                        </div>
                    ))}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}

                    style={{
                        minHeight: focus ? '32px' : 0,
                        height: focus ? '32px' : 0,
                    }}
                />

                <AddButton />

                <ul className={`${styles.results} ${focus ? styles.show : ''}`}>
                    {searchResults.length > 0 ?
                        searchResults.map((user, idx) =>
                            <li
                                className={styles.result}
                                key={idx}
                                onClick={() => selectUser(user)}
                            >
                                <Image
                                    alt={user.name}
                                    height={38}
                                    src='https://source.unsplash.com/random/100'
                                    width={38}
                                />

                                <div className={styles.details}>
                                    <span className={styles.title}>{user.name}</span>
                                    <small>{user.email}</small>
                                </div>
                            </li>
                        ) : <div className=""></div>}
                </ul>
            </div>
        </div>
    );
};

export default RoleSearch;
