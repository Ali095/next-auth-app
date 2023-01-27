
import Image from 'next/image';
import React, { useState } from 'react';
import Icon from '../../../Icons/Icons';
import styles from './member.module.scss';
import RoleSelect from '../RoleSelect/RoleSelect';

type MemberType = {
    email?: string
    name: string
    role: string
    thumbnail: string
}

type RoleOption = {
    label: string
    value: string | number
}

const roleOptions = [
    {
        label: 'Admin',
        value: 'admin'
    },
    {
        label: 'Read',
        value: 'read'
    },
    {
        label: 'Write',
        value: 'write'
    },
];

const Member = ({ email, name, thumbnail }: MemberType) => {
    const [role, setRole] = useState<RoleOption | undefined>(roleOptions[0]);

    return (
        <div className={styles.wrap}>
            <Image
                src='https://source.unsplash.com/random/100'
                width={48}
                height={48}
                alt={name}
                className={styles.avatar}
            />

            <div className={styles.details}>
                <h3 className={styles.name}>{name}</h3>
                {email && <small className={styles.email}>{email}</small>}
            </div>

            <RoleSelect
                value={role}
                options={roleOptions}
                onChange={(value) => setRole(value)}
                style={{ marginLeft: 'auto' }}
            />

            <button className={styles.delete}><Icon name='delete' /></button>
        </div>
    );
};

export default Member;