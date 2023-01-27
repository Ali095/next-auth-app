
import React, { useState } from 'react';
import { SelectOption } from '../../../@types/typings';
import { plans, roleOptions } from '../../../data/selectOptions';
import InputGroup from '../../InputGroup/InputGroup';
import Select from '../../Select/Select';
import styles from './add.module.scss';

const AddUser = ({ closePopup }: { closePopup: () => void }) => {
    const [role, setRole] = useState<SelectOption | undefined>(roleOptions[0]);
    const [plan, setPlan] = useState<SelectOption | undefined>(plans[0]);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    function reset() {
        setFullName('');
        setUsername('');
        setEmail('');
        setRole(roleOptions[0]);
        setPlan(plans[0]);
    }

    function handleCancel() {
        reset();
        closePopup();
    }

    return (
        <div className={styles.wrap}>
            {/* <header className={styles.header}>
                <h3 className={styles.title}>Add Users</h3>
            </header> */}

            <div className={styles.body}>
                <InputGroup label='Full Name'>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </InputGroup>
                <InputGroup label='Username'>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputGroup>
                <InputGroup label='Email'>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup label='Select Role'>
                    <Select
                        value={role}
                        options={roleOptions}
                        onChange={(o) => setRole(o)}
                        style={{ maxWidth: '100%' }}
                    />
                </InputGroup>
                <InputGroup label='Select Plan'>
                    <Select
                        value={plan}
                        options={plans}
                        onChange={(o) => setPlan(o)}
                        style={{ maxWidth: '100%' }}
                    />
                </InputGroup>
            </div>

            <div className={styles.footer}>
                <button
                    type='button'
                    className="btn__primary"
                    style={{ maxWidth: 'max-content' }}
                >Submit</button>

                <button
                    type='button'
                    className="btn__transparent"
                    onClick={handleCancel}
                >Cancel</button>
            </div>
        </div>
    );
};

export default AddUser;
