
import React from 'react';
import Image from 'next/image';
import styles from './styles/profile.module.scss';

type ProfileProps = {
    profilePicture: string
    name: string
    email: string
}


export const UserProfile = ({ profilePicture, name, email }: ProfileProps) => {
    return (
        <span className={styles.user}>
            <span className={styles.avatar}>
                <Image loading='lazy' src={profilePicture} width={40} height={40} alt={name} />
            </span>

            <span className={styles['user-details']}>
                <span className={styles.name}>{name}</span>
                {email && <small>{email}</small>}
            </span>
        </span>
    )
}
