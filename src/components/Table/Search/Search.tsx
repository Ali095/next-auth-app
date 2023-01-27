
import React from 'react';
import Icon from '../../Icons/Icons';
import styles from './search.module.scss';

const Search = () => {
    return (
        <div className={styles.search}>
            <Icon name='search' />
            <input type="text" placeholder='Search user' />
        </div>
    );
};

export default Search;
