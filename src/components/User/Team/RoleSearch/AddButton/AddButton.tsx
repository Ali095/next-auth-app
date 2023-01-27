
import React, { useEffect, useState } from 'react';
import Icon from '../../../../Icons/Icons';
import styles from './add.module.scss';

const AddButton = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            setTimeout(() => { setLoading(false); }, 2000);
        }
    }, [loading]);

    return (
        <button
            className={`${styles.add} ${loading ? styles.loading : ''}`}
            onClick={() => setLoading(true)}
        >
            <Icon name='plus' />
        </button>
    );
};

export default AddButton;
