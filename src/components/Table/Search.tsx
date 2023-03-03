
import React, { useState } from 'react';
import { Icon } from '../Icons';
import styles from './styles/search.module.scss';

export type SearchProps = {
    placeholder?: string;
    onInputChange: (value: string) => any;
}

export const Search = ({ placeholder = 'Type to Search', onInputChange }: SearchProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || searchQuery === '') {
            onInputChange(searchQuery);
        }
    };

    return (
        <div className={styles.search}>
            <Icon name='search' />
            <input id='tabel_search' type="text" placeholder={placeholder} onKeyUp={handleKeyPress} onChange={handleInputChange} />
        </div>
    )
}
