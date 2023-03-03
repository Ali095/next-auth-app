
import React from 'react';
import styles from './styles/header.module.scss';
import { UserProfileMenu } from './UserProfileMenu';

export const Header = ({ ...props }) => {
    return (
        <div className={styles.wrap} {...props}>
            <UserProfileMenu />
        </div>
    )
}
