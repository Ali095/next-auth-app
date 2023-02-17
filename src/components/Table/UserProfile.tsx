
import React from 'react';
import Image from 'next/image';
import styles from './styles/profile.module.scss';

type ProfileProps = {
    profilePicture?: string
    name: string
    email?: string
}


export const UserProfile = ({ profilePicture, name, email }: ProfileProps) => {
    const avatar = profilePicture || `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&size=512&background=${generateHexColor()}&font-size=0.45`;
    return (
        <span className={styles.user}>
            <span className={styles.avatar}>
                <Image loading='lazy' src={avatar} width={40} height={40} alt={name} />
            </span>

            <span className={styles['user-details']}>
                <span className={styles.name}>{name}</span>
                {email && <small>{email}</small>}
            </span>
        </span>
    )
}
