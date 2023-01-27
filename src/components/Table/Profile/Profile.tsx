
import React from 'react';
import Image from 'next/image';
import styles from './profile.module.scss';

type ProfileProps = {
    avatar: string
    name: string
    email?: string
}

const Profile = ({ avatar, name, email }: ProfileProps) => {
    return (
        <span className={styles.user}>
            <span className={styles.avatar}>
                <Image src={'https://source.unsplash.com/random/100'} width={40} height={40} alt={name} />
            </span>

            <span className={styles['user-details']}>
                <span className={styles.name}>{name}</span>
                {email && <small>{email}</small>}
            </span>
        </span>
    );
};

export default Profile;
