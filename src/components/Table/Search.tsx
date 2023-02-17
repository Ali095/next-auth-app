
import React from 'react';
import { Icon } from '../Icons';
import styles from './styles/search.module.scss';

export type SearchProps = {
    placeholder?: string;
    onInputChange: (value: string) => any;
}

export const Search = ({ placeholder = 'Type to Search', onInputChange }: SearchProps) => {
    return (
        <div className={styles.search}>
            <Icon name='search' />
            <input type="text" placeholder={placeholder} onChange={e => onInputChange(e.target.value)} />
        </div>
    )
}
