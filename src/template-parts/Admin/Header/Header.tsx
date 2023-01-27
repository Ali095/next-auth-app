
import React from 'react';
import styles from './header.module.scss';
import UserProfileMenu from '../UserProfileMenu/UserProfileMenu';

const Header = ({ ...props }) => {
    return (
        <div className={styles.wrap} {...props}>
            <UserProfileMenu />
        </div>
    )
}

export default Header;
